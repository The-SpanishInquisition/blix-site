<script lang="ts">
  const openGithub = () => {
    window.open("https://github.com/COS301-SE-2023/AI-Photo-Editor", "_blank");
  };

  const openYoutube = () => {
    window.open("https://www.youtube.com/watch?v=7y2TohRtZDU", "_blank");
  };
</script>

<div class="card card-hover p-4 w-5/6 mx-auto">
  Blix is a cross-platform desktop application designed to give users a powerful
  and intuitive photo editing experience. It provides a composable node-based
  system that establishes a common ground to facilitate collaborative human/AI
  photo editing workflows.
</div>

<div class="logo-cloud grid-cols-1 lg:!grid-cols-2 gap-1 w-3/6 mt-12 mx-auto">
  <a class="logo-item" href="/">
    <span on:click={openGithub}>
      <img src="github.svg" alt="Github" />
    </span>
    <span>Github</span>
  </a>
  <a class="logo-item" href="/">
    <span on:click={openYoutube}>
      <img src="youtube.svg" alt="Youtube" />
    </span>
    <span>Youtube</span>
  </a>
</div>
