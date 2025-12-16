<script lang="ts">
  interface Props {
    titre: string;
    soustitre: string;
    illustration: Image;
    badge?: boolean;
    actiongauche: Action;
    actiondroite: Action;
    partenaires?: Image[];
  }

  let { titre, soustitre, illustration, badge, actiongauche, actiondroite, partenaires }: Props = $props();
</script>

<lab-anssi-brique-hero
  {titre}
  {soustitre}
  {illustration}
  {badge}
  {actiongauche}
  {actiondroite}
  {partenaires}
></lab-anssi-brique-hero>
