<script lang="ts">
  interface Props {
    id: string;
    name: string;
    label?: string;
    value?: string;
    size?: RadioSize;
    hint?: string;
    rich?: boolean;
    hasPictogram?: boolean;
    pictogramName?: string;
    pictogramAccent?: Accent;
    disabled?: boolean;
    form?: string;
    required?: boolean;
  }

  let { id, name, label, value, size, hint, rich, hasPictogram, pictogramName, pictogramAccent, disabled, form, required }: Props = $props();
</script>

<dsfr-radio
  {id}
  {name}
  {label}
  {value}
  {size}
  {hint}
  {rich}
  has-pictogram={hasPictogram}
  pictogram-name={pictogramName}
  pictogram-accent={pictogramAccent}
  {disabled}
  {form}
  {required}
></dsfr-radio>
