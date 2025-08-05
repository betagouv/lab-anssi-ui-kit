<svelte:options customElement="lab-anssi-resume-pssi" />

<script lang="ts">
  interface Props {
    nomService: string;
  }

  let { nomService }: Props = $props();
</script>

<p>
  {nomService} est hébergé chez
  <a href="https://www.clever-cloud.com/" rel="noopener" target="_blank"> Clever Cloud </a>
  prenant appui sur
  <a href="https://www.cloud-temple.com/notre-approche-secnumcloud/" rel="noopener" target="_blank">
    Cloud Temple
  </a>
  qualifié SecNumCloud.
</p>
<p>
  L'ANSSI soumet {nomService} à un rythme d'homologation soutenu dans le cadre d'une démarche de renforcement
  continu de la sécurité du service numérique, dont plusieurs éléments clés mais non exhaustifs sont
  résumés ci-dessous.
</p>
<h2>Gouvernance</h2>
<p>
  Nous auditons régulièrement nos fournisseurs en termes de configuration et d'architecture et
  maintenons un contact étroit avec eux pour améliorer en continu leur sécurité et donc celle de vos
  données.
</p>
<p>
  Nous auditons également régulièrement nos services (audits de code et tests d'intrusion) par des
  prestataires qualifiés (PASSI).
</p>
<p>
  Nous réalisons et tenons à jour une analyse de risques de nos services en prenant appui sur la
  méthode EBIOS Risk Manager.
</p>
<p>
  Nous maintenons une classification de l'ensemble des données que nous conservons, selon leur
  sensibilité, afin d'assurer une protection adaptée.
</p>
<p>
  Nous maintenons un dossier d’architecture technique détaillé de nos services et de leurs
  interconnexions.
</p>
<p>
  Les membres de nos équipes sont sensibilisés aux bonnes pratiques de sécurité, quels que soient
  les profils (technique, produit, design, déploiement), au travers de formations en continu ou de
  la réalisation de campagnes anti-phishing.
</p>
<h2>Protection</h2>
<p>Vos données sont protégées par un chiffrement multi-couches, système et applicatif.</p>
<p>
  Chaque membre de notre équipe est équipé de clés d'authentification matérielle et
  l’authentification multi-facteur est généralisée à tous les accès, permettant de mettre en œuvre
  une authentification forte sur l'ensemble de nos services.
</p>
<p>
  Nous limitons les accès au strict nécessaire et cloisonnons de façon rigoureuse les activités
  d'administration, en particulier au niveau technique&nbsp;: utilisation de comptes dédiés et
  séparés selon leurs usages&nbsp;; postes d'administration durcis et réservés à ce seul
  usage&nbsp;; clés d’authentification nominatives.
</p>
<p>Nous n’installons et n’utilisons que les applications strictement nécessaires.</p>
<p>Les droits des administrateurs techniques et métiers sont restreints au strict nécessaire.</p>
<h2>Défense</h2>
<p>
  La sécurité de nos services est surveillée en continu : détection de défiguration, scans
  automatisés, veille active sur les risques émergents.
</p>
<p>
  L'ensemble des actions est historisé de façon nominative pour simplifier l'analyse en cas
  d'incident.
</p>
<p>
  Nous mettons en œuvre et testons régulièrement notre procédure de gestion des incidents de
  sécurité.
</p>
<h2>Résilience</h2>
<p>
  Vos données sont sauvegardées de façon sécurisée et pérenne sur un environnement totalement séparé
  de la plate-forme de production.
</p>
<p>
  En cas d'incident majeur, nous sommes capables de reconstruire totalement l'application en
  production dans un délai très court.
</p>

<style lang="scss">
  a {
    display: inline-flex;
    color: #000091;
    border: none;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
</style>
