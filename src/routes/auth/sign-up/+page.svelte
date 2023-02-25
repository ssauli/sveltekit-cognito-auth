<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<h1>Sign up</h1>

<form method="POST">
  <label>
    Email
    <input name="email" type="email" />
  </label>
  <label>
    Password
    <input name="password" type="password" />
  </label>
  <button>Register</button>
</form>

{#if form?.error}
  {form.error}
{/if}
