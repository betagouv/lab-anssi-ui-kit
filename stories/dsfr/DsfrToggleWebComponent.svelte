<script lang="ts">
  interface Props {
    id: string;
    label?: string;
    hint?: string;
    hintId: string;
    disabled?: boolean;
    checked?: boolean;
    border?: boolean;
    left?: boolean;
    state?: boolean;
    status?: Status;
    errorMessage?: string;
    validMessage?: string;
    form?: string;
    required?: boolean;
  }

  let { id, label, hint, hintId, disabled, checked, border, left, state, status, errorMessage, validMessage, form, required }: Props = $props();
</script>

<dsfr-toggle
  {id}
  {label}
  {hint}
  hint-id={hintId}
  {disabled}
  {checked}
  {border}
  {left}
  {state}
  {status}
  error-message={errorMessage}
  valid-message={validMessage}
  {form}
  {required}
></dsfr-toggle>
