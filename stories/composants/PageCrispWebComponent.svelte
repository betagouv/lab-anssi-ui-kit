<script lang="ts">
  interface Props {
    contenu: string;
    tableDesMatieres: TableDesMatieres;
  }

  let { contenu, tableDesMatieres }: Props = $props();
</script>

<lab-anssi-page-crisp
  {contenu}
  table-des-matieres={tableDesMatieres}
></lab-anssi-page-crisp>
