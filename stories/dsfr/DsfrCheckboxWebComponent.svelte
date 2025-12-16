<script lang="ts">
  interface Props {
    id: string;
    label?: string;
    name?: string;
    size?: ChecboxSize;
    hint?: string;
    disabled?: boolean;
    checked?: boolean;
    value?: string;
    status?: "default" | "valid" | "error";
    errorMessage?: string;
    validMessage?: string;
    form?: string;
    required?: boolean;
  }

  let { id, label, name, size, hint, disabled, checked, value, status, errorMessage, validMessage, form, required }: Props = $props();
</script>

<dsfr-checkbox
  {id}
  {label}
  {name}
  {size}
  {hint}
  {disabled}
  {checked}
  {value}
  {status}
  error-message={errorMessage}
  valid-message={validMessage}
  {form}
  {required}
></dsfr-checkbox>
