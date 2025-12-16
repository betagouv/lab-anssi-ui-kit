<script lang="ts">
  interface Props {
    id: string;
    legend: string;
    checkboxes: Checkbox[];
    hint?: string;
    size?: CheckboxesSize;
    inline?: boolean;
    disabled?: boolean;
    values?: SelectedValues;
    status?: "default" | "valid" | "error";
    errorMessage?: string;
    validMessage?: string;
  }

  let { id, legend, checkboxes, hint, size, inline, disabled, values, status, errorMessage, validMessage }: Props = $props();
</script>

<dsfr-checkboxes-group
  {id}
  {legend}
  {checkboxes}
  {hint}
  {size}
  {inline}
  {disabled}
  {values}
  {status}
  error-message={errorMessage}
  valid-message={validMessage}
></dsfr-checkboxes-group>
