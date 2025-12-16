<script lang="ts">
  interface Props {
    id: string;
    label?: string;
    hint?: string;
    value?: string;
    placeholder?: string;
    name?: string;
    autocomplete?: string;
    disabled?: boolean;
    status?: "default" | "valid" | "error" | "info";
    errorMessage?: string;
    validMessage?: string;
    rows?: number;
    infoMessage?: string;
  }

  let { id, label, hint, value, placeholder, name, autocomplete, disabled, status, errorMessage, validMessage, rows, infoMessage }: Props = $props();
</script>

<dsfr-textarea
  {id}
  {label}
  {hint}
  {value}
  {placeholder}
  {name}
  {autocomplete}
  {disabled}
  {status}
  error-message={errorMessage}
  valid-message={validMessage}
  {rows}
  info-message={infoMessage}
></dsfr-textarea>
