<script lang="ts">
  interface Props {
    description: string;
    type: "information" | "erreur";
    fermable: boolean;
  }

  let { description, type, fermable }: Props = $props();
</script>

<lab-anssi-alerte {description} {type} {fermable}></lab-anssi-alerte>
