<script lang="ts">
  interface Props {
    inputId: string;
    inputLabel: string;
    buttonLabel: string;
    buttonTitle: string;
    size?: SearchSize;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    form?: string;
    maxlength?: number;
    minlength?: number;
    name?: string;
    pattern?: string;
    readonly?: boolean;
    required?: boolean;
  }

  let { inputId, inputLabel, buttonLabel, buttonTitle, size, placeholder, value, disabled, form, maxlength, minlength, name, pattern, readonly, required }: Props = $props();
</script>

<dsfr-search
  input-id={inputId}
  input-label={inputLabel}
  button-label={buttonLabel}
  button-title={buttonTitle}
  {size}
  {placeholder}
  {value}
  {disabled}
  {form}
  {maxlength}
  {minlength}
  {name}
  {pattern}
  {readonly}
  {required}
></dsfr-search>
