<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<h1>Confirm registration</h1>
<p>enter code that was sent to your email</p>

<form method="POST" action="?/confirmRegistration">
  <label>
    Confirmation code
    <input name="confirmationCode" type="text" />
  </label>
  <button>Confirm</button>
</form>

{#if form?.success === false}
  {form.error}
{/if}
