<script lang="ts">
  interface Props {
    id: string;
    label: string;
    hint?: string;
    type?: "date" | "email" | "password" | "number" | "search" | "tel" | "text" | "url";
    icon?: string;
    value?: string;
    placeholder?: string;
    name?: string;
    autocomplete?: string;
    disabled?: boolean;
    status?: "default" | "valid" | "error" | "info";
    errorMessage?: string;
    validMessage?: string;
    infoMessage?: string;
    form?: string;
    max?: string;
    maxlength?: number;
    min?: string;
    minlength?: number;
    pattern?: string;
    readonly?: boolean;
    required?: boolean;
    step?: number;
  }

  let { id, label, hint, type, icon, value, placeholder, name, autocomplete, disabled, status, errorMessage, validMessage, infoMessage, form, max, maxlength, min, minlength, pattern, readonly, required, step }: Props = $props();
</script>

<dsfr-input
  {id}
  {label}
  {hint}
  {type}
  {icon}
  {value}
  {placeholder}
  {name}
  {autocomplete}
  {disabled}
  {status}
  error-message={errorMessage}
  valid-message={validMessage}
  info-message={infoMessage}
  {form}
  {max}
  {maxlength}
  {min}
  {minlength}
  {pattern}
  {readonly}
  {required}
  {step}
></dsfr-input>
