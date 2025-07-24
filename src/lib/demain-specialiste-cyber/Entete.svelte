<script lang="ts">
  import { srcAsset } from "$lib/assets/assets";

  import Conteneur from "./Conteneur.svelte";
  import BlocMarque from "./BlocMarque.svelte";

  export let brandService: string;
  export let brandTagline: string;
  export let brandLinkTitle: string;
  export let brandOperatorAlt: string;
  export let brandOperatorSrc: string;
  export let brandOperatorStyle: string;
  export let modalId: string;
  export let modalTriggerId: string;

  /**
   * Gère le clic sur le bouton de menu pour ouvrir une modale accessible.
   *
   * Lorsqu'un utilisateur clique sur le bouton, cette fonction :
   * - Ajoute l'attribut `data-fr-opened="true"` au bouton cliqué.
   * - Récupère l'identifiant de la modale à ouvrir via l'attribut `aria-controls` du bouton.
   * - Si la modale existe :
   *   - Ajoute la classe CSS `fr-modal--opened` à la modale.
   *   - Définit les attributs d'accessibilité nécessaires (`aria-modal`, `open`, `role`) sur la modale.
   *
   * @param {MouseEvent} event - L'événement de clic déclenché par l'utilisateur sur le bouton de menu.
   */
  function handleMenuClick(event: MouseEvent) {
    const btn = event.currentTarget as HTMLButtonElement;
    btn.setAttribute("data-fr-opened", "true");
    const modalId = btn.getAttribute("aria-controls");

    if (modalId) {
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.add("fr-modal--opened");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("open", "true");
        modal.setAttribute("role", "dialog");
      }
    }
  }

  /**
   * Gère le clic sur le bouton de fermeture d'une modale.
   *
   * Cette fonction retire les attributs et classes liés à l'ouverture de la modale,
   * puis met à jour l'état du bouton déclencheur pour indiquer que la modale est fermée.
   *
   * @param {MouseEvent} event - L'événement de clic déclenché par l'utilisateur sur le bouton de fermeture.
   */
  function handleCloseClick(event: MouseEvent) {
    const btn = event.currentTarget as HTMLButtonElement;
    const modalId = btn.getAttribute("aria-controls");
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove("fr-modal--opened");
        modal.removeAttribute("aria-modal");
        modal.removeAttribute("open");
        modal.removeAttribute("role");
      }

      const menuBtn = document.getElementById(modalTriggerId);
      if (menuBtn) {
        menuBtn.setAttribute("data-fr-opened", "false");
      }
    }
  }
</script>

<header role="banner" class="fr-header">
  <div class="fr-header__body">
    <Conteneur>
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <div class="fr-header__brand-top">
            <div class="fr-header__logo">
              <BlocMarque title="Gouvernement" />
            </div>
            <div class="fr-header__operator">
              <a
                href="/"
                title={`Retour à l'accueil du site - ${brandOperatorAlt} - République Française`}
              >
                <img
                  class="fr-responsive-img"
                  style={brandOperatorStyle}
                  src={srcAsset(brandOperatorSrc)}
                  alt={brandOperatorAlt}
                />
              </a>
            </div>
            <div class="fr-header__navbar">
              <button
                data-fr-opened="false"
                aria-controls={modalId}
                title="Menu"
                type="button"
                id={modalTriggerId}
                class="fr-btn--menu fr-btn"
                on:click={handleMenuClick}>Menu</button
              >
            </div>
          </div>
          <div class="fr-header__service">
            <a href="/" title={brandLinkTitle}>
              <p class="fr-header__service-title">{brandService}</p>
            </a>
            <p class="fr-header__service-tagline">{brandTagline}</p>
          </div>
        </div>
        <div class="fr-header__tools">
          <div class="fr-header__tools-links">
            <ul class="fr-btns-group">
              <li>
                <a href="/" class="fr-icon-user-line fr-btn--icon-left fr-btn">Espace enseignant</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Conteneur>
  </div>
  <div class="fr-header__menu fr-modal" id={modalId} aria-labelledby={modalTriggerId}>
    <Conteneur>
      <button
        aria-controls={modalId}
        title="Fermer"
        type="button"
        id={`${modalTriggerId}-close`}
        class="fr-btn--close fr-btn"
        on:click={handleCloseClick}>Fermer</button
      >
      <!-- NAVIGATION -->
      <slot name="navigation" />
    </Conteneur>
  </div>
</header>
