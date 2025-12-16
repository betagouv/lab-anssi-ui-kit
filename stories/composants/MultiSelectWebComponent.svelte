<script lang="ts">
  interface Props {
    id: string;
    label: string;
    options?: Option[];
    hint?: string;
    placeholder?: string;
    disabled?: boolean;
    values?: string[];
    status?: "default" | "valid" | "error";
    errorMessage?: string;
    validMessage?: string;
  }

  let { id, label, options, hint, placeholder, disabled, values, status, errorMessage, validMessage }: Props = $props();
</script>

<lab-anssi-multi-select
  {id}
  {label}
  {options}
  {hint}
  {placeholder}
  {disabled}
  {values}
  {status}
  error-message={errorMessage}
  valid-message={validMessage}
></lab-anssi-multi-select>
