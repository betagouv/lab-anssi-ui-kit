<script lang="ts">
  interface Props {
    id: string;
    label: string;
    value?: string;
    groupedOptions?: boolean;
    options?: Option[] | undefined;
    optionGroups: OptionGroup | undefined;
    hint?: string;
    placeholder?: string;
    placeholderDisabled?: boolean | undefined;
    disabled?: boolean;
    status?: "default" | "valid" | "error" | "info";
    errorMessage?: string;
    validMessage?: string;
    infoMessage?: string;
    form?: string;
    required?: boolean;
  }

  let { id, label, value, groupedOptions, options, optionGroups, hint, placeholder, placeholderDisabled, disabled, status, errorMessage, validMessage, infoMessage, form, required }: Props = $props();
</script>

<dsfr-select
  {id}
  {label}
  {value}
  grouped-options={groupedOptions}
  {options}
  option-groups={optionGroups}
  {hint}
  {placeholder}
  placeholder-disabled={placeholderDisabled}
  {disabled}
  {status}
  error-message={errorMessage}
  valid-message={validMessage}
  info-message={infoMessage}
  {form}
  {required}
></dsfr-select>
