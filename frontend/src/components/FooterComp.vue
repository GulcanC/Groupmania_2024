<template>
  <footer class="footer fixed-bottom">
    <p class="text-center">Gulcan COSKUN | Project7 - Groupmania | 2024</p>
  </footer>
</template>

<style>
:root {
  --primary-color: "#fd2d01";
  --secondary-color: #ffd7d7;
  --tertiary-color: "#4E5166";
}

footer {
  background-color: #4e5166;
  width: 100%;
  height: 5rem;
  position: absolute;
}

footer p {
  text-align: center;
  margin: 1.7rem;
  background: transparent;
  color: white;
  font-size: 1rem;
  transition: all 0.2s;
}

footer p:hover {
  color: #ffd7d7;
}

@media (max-width: 992px) {
  footer {
    text-align: center;
    font-size: 1.2 rem;
  }
}

@media (max-width: 400px) {
  footer {
    background-color: transparent;
    text-align: center;
  }

  footer p {
    color: #4e5166;
    margin: auto !important;
  }
}

@media (max-width: 300px) {
  footer p {
    display: none;
  }
}
</style>
