<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import PresentationANSSI from "$lib/composants/vitrines-produits/briques/PresentationANSSI.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Presentation ANSSI",
    component: PresentationANSSI,
    render: template,
  });

  type Args = ComponentProps<PresentationANSSI>;
</script>

{#snippet template(_args: Args)}
  <lab-anssi-presentation-anssi></lab-anssi-presentation-anssi>
{/snippet}

<Story name="Defaut" />

<Story name="Avec usage du slot titre">
  {#snippet template(_args: Args)}
    <lab-anssi-presentation-anssi>
      <h2 slot="titre">Qu'est-ce que l'ANSSI ? (slot)</h2>
      <p>
        Créée en 2009, l'Agence nationale de la sécurité des systèmes d'information (<abbr>
          ANSSI
        </abbr>) est l'autorité nationale en matière de cybersécurité et de cyberdéfense (slot).
      </p>
      <p>
        <strong>
          Son action pour la protection de la Nation face aux cyberattaques se traduit en cinq
          grandes missions : défendre, connaître, partager, accompagner, réguler (slot).
        </strong>
      </p>
    </lab-anssi-presentation-anssi>
  {/snippet}
</Story>
