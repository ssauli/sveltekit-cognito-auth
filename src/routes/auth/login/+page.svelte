<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<h1>Log In</h1>

<form method="POST" action="?/login">
  <label>
    Email
    <input name="email" type="email" />
  </label>
  <label>
    Password
    <input name="password" type="password" />
  </label>
  <button>Log in</button>
</form>

{#if form?.error}
  {form.error}
{/if}
