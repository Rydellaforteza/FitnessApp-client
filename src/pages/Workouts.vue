<template>
  <div class="container mt-4">

    <!-- Page Title -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">My Workouts</h2>

      
      <button id="addWorkout" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#addWorkoutModal"> Add Workout</button>
    </div>

    <div class="row gy-3">

      <div v-for="w in workouts" :key="w._id" class="col-md-6 col-lg-4">
        <div class="card workout-card shadow-sm border-0">
          <div class="card-body">

            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h5 class="fw-bold mb-1">{{ w.name }}</h5>
                <p class="text-muted mb-1">{{ w.duration }} minutes</p>
                <p class="text-muted small">Added: {{ formatDate(w.dateAdded) }}</p>
              </div>

              <span class="badge rounded-pill px-3 py-2" :class="w.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'">{{ w.status }}</span>
            </div>

            <div class="d-flex gap-2 mt-3">
              <button class="btn btn-outline-success btn-sm" @click="completeWorkout(w._id)" :disabled="w.status === 'completed'">Complete </button>

              <button class="btn btn-outline-primary btn-sm" @click="openEditModal(w)">Edit</button>

              <button class="btn btn-outline-danger btn-sm" @click="deleteWorkout(w._id)">Delete</button>
            </div>

          </div>
        </div>
      </div>

    </div>

 
    <div class="modal fade" id="addWorkoutModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title fw-bold">Add Workout</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">

            <div class="mb-3">
              <label class="form-label">Workout Name</label>
              <input v-model="newWorkout.name" class="form-control" placeholder="e.g. Jogging" />
            </div>

            <div class="mb-3">
              <label class="form-label">Duration (minutes)</label>
              <input v-model.number="newWorkout.duration" class="form-control" type="number" min="1" />
            </div>

          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" @click="addWorkout">Add</button>
          </div>

        </div>
      </div>
    </div>

    
    <div class="modal fade" id="editWorkoutModal" tabindex="-1" aria-hidden="true" ref="editModal">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title fw-bold">Edit Workout</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">

            <div class="mb-3">
              <label class="form-label">Workout Name</label>
              <input v-model="editWorkoutData.name" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Duration (minutes)</label>
              <input v-model.number="editWorkoutData.duration" class="form-control" type="number" min="1" />
            </div>

          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" @click="updateWorkout">Save Changes</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as bootstrap from "bootstrap";
import api from "../api";
import { notyf } from "../stores/notyf";
import { useRouter } from "vue-router";


const router = useRouter();


const workouts = ref([]);
const newWorkout = ref({ name: "", duration: 1 });
const editWorkoutData = ref({ _id: "", name: "", duration: 0 });


const ensureLoggedIn = () => {
  if (!localStorage.getItem("token")) {
    router.push("/login");
  }
};


const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });


const loadWorkouts = () => {
  api
    .get("/workouts/getMyWorkouts")
    .then((res) => {
      workouts.value = res.data.workouts || [];
    })
    .catch(() => notyf.error("Failed to load workouts"));
};


const addWorkout = () => {
  api
    .post("/workouts/addWorkout", newWorkout.value)
    .then(() => {
      notyf.success("Workout added!");
      newWorkout.value = { name: "", duration: 1 };
      loadWorkouts();
    })
    .catch(() => notyf.error("Failed to add workout"));
};


const deleteWorkout = (id) => {
  api
    .delete(`/workouts/deleteWorkout/${id}`)
    .then(() => {
      notyf.success("Workout deleted!");
      loadWorkouts();
    })
    .catch(() => notyf.error("Failed to delete workout"));
};


const completeWorkout = (id) => {
  api
    .patch(`/workouts/completeWorkoutStatus/${id}`)
    .then(() => {
      notyf.success("Workout completed!");
      loadWorkouts();
    })
    .catch(() => notyf.error("Failed to mark complete"));
};


const openEditModal = (w) => {
  editWorkoutData.value = { ...w };
  const modal = new bootstrap.Modal(document.getElementById("editWorkoutModal"));
  modal.show();
};


const updateWorkout = () => {
  const modalEl = document.getElementById("editWorkoutModal");
  const modal = bootstrap.Modal.getInstance(modalEl);

  api
    .patch(`/workouts/updateWorkout/${editWorkoutData.value._id}`, editWorkoutData.value)
    .then(() => {
      notyf.success("Workout updated!");

      
      if (modal) modal.hide();

      setTimeout(() => {
        loadWorkouts();
      }, 300); 
    })
    .catch(() => notyf.error("Failed to update workout"));
};


onMounted(() => {
  ensureLoggedIn();
  loadWorkouts();
});
</script>

<style scoped>
.workout-card {
  border-radius: 12px;
  transition: 0.2s ease;
}

.workout-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}
</style>
