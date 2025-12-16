<script lang="ts">
  interface Props {
    titre: string;
    description?: string;
    filAriane?: NoeudFilAriane[];
    infosTag?: InfosTag | null;
  }

  let { titre, description, filAriane, infosTag }: Props = $props();
</script>

<lab-anssi-bandeau-titre
  {titre}
  {description}
  fil-ariane={filAriane}
  infos-tag={infosTag}
></lab-anssi-bandeau-titre>
