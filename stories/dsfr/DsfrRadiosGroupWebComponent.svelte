<script lang="ts">
  interface Props {
    id: string;
    legend: string;
    radios: Radio[];
    hint?: string;
    size?: RadiosSize;
    rich?: boolean;
    hasPictogram?: boolean;
    inline?: boolean;
    disabled?: boolean;
    value?: string;
    status?: "default" | "valid" | "error";
    errorMessage?: string;
    validMessage?: string;
  }

  let { id, legend, radios, hint, size, rich, hasPictogram, inline, disabled, value, status, errorMessage, validMessage }: Props = $props();
</script>

<dsfr-radios-group
  {id}
  {legend}
  {radios}
  {hint}
  {size}
  {rich}
  has-pictogram={hasPictogram}
  {inline}
  {disabled}
  {value}
  {status}
  error-message={errorMessage}
  valid-message={validMessage}
></dsfr-radios-group>
