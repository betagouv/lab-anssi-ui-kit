declare namespace svelteHTML {
  interface IntrinsicElements {
    "dsfr-alert": {
      "button-close-label"?: string;
      "has-title"?: boolean;
      title?: string;
      "has-description"?: boolean;
      text?: string;
      type?: any;
      size?: any;
      id?: string;
      dismissible?: boolean;
      icon?: string;
    };
    "dsfr-badge": {
      label?: string;
      accent?: any;
      ellipsis?: boolean;
      "has-icon"?: boolean;
      "has-no-icon"?: boolean;
      icon?: string;
      size?: any;
      status?: any;
      type?: any;
    };
    "dsfr-badges-group": {
      badges?: any;
      size?: any;
      "group-markup"?: any;
    };
    "dsfr-breadcrumb": {
      id?: string;
      segments?: any;
      "button-aria-label"?: string;
      "button-label"?: string;
      inverse?: boolean;
      markup?: any;
      "has-margin-variant"?: boolean;
    };
    "dsfr-button": {
      label?: string;
      kind?: string;
      size?: string;
      disabled?: boolean;
      centered?: boolean;
      "has-icon"?: boolean;
      icon?: string;
      "icon-place"?: string;
    };
    "dsfr-buttons-group": {
      size?: any;
      "has-icon"?: boolean;
      "icon-place"?: any;
      "group-markup"?: any;
      inline?: any;
      equisized?: boolean;
      align?: any;
      reverse?: boolean;
      buttons?: any;
    };
    "dsfr-card": {
      src?: string;
      alt?: string;
      id?: string;
      title?: string;
      "has-description"?: boolean;
      description?: string;
      "has-detail-start"?: boolean;
      "detail-start"?: string;
      "has-detail-start-icon"?: boolean;
      "detail-start-icon"?: string;
      "has-detail-end"?: boolean;
      "detail-end"?: string;
      "has-detail-end-icon"?: boolean;
      "detail-end-icon"?: string;
      "has-badge"?: boolean;
      "has-tag"?: boolean;
      markup?: any;
      enlarge?: boolean;
      "action-markup"?: any;
      "action-title"?: string;
      href?: string;
      blank?: boolean;
      "no-link"?: boolean;
      disabled?: boolean;
      size?: any;
      horizontal?: boolean;
      "horizontal-proportion"?: any;
      "has-header-badge"?: boolean;
      "image-ratio"?: any;
      "has-buttons"?: boolean;
      "has-links"?: boolean;
      variations?: any;
      download?: boolean;
      "has-download-icon"?: boolean;
      lang?: string;
    };
    "dsfr-checkbox": {
      id?: string;
      label?: string;
      name?: string;
      size?: any;
      hint?: string;
      disabled?: boolean;
      checked?: boolean;
      value?: string;
      status?: any;
      "error-message"?: string;
      "valid-message"?: string;
      form?: string;
      required?: boolean;
    };
    "dsfr-checkboxes-group": {
      id?: string;
      legend?: string;
      checkboxes?: any;
      hint?: string;
      size?: any;
      inline?: boolean;
      disabled?: boolean;
      values?: any;
      status?: any;
      "error-message"?: string;
      "valid-message"?: string;
    };
    "dsfr-connect": {
      id?: string;
      href?: string;
      variant?: any;
      markup?: any;
      disabled?: boolean;
    };
    "dsfr-container": {
      fluid?: boolean;
    };
    "dsfr-content": {
      size?: any;
      caption?: string;
      "has-link"?: boolean;
      "link-label"?: string;
      "link-href"?: string;
      type?: any;
      "img-ratio"?: any;
      "vid-ratio"?: any;
      img?: any;
      vid?: any;
      svg?: string;
    };
    "dsfr-dropdown": {
      id?: string;
      "collapse-id"?: string;
      "button-id"?: string;
      "button-title"?: string;
      "button-kind"?: any;
      "button-size"?: any;
      "button-icon"?: string;
      "button-icon-place"?: any;
      "content-type"?: any;
      align?: any;
    };
    "dsfr-footer": {
      id?: string;
      "is-mourning"?: boolean;
      "brand-logo-title"?: string;
      "brand-link-title"?: string;
      "brand-link-href"?: string;
      "brand-link-id"?: string;
      "has-brand-operator"?: boolean;
      "brand-operator-alt"?: string;
      "brand-operator-src"?: string;
      "brand-operator-style"?: string;
      "has-description"?: boolean;
      "content-description"?: string;
      "has-partners"?: boolean;
      "partner-title"?: string;
      "main-partner-src"?: string;
      "main-partner-href"?: string;
      "main-partner-alt"?: string;
      "main-partner-style"?: string;
      "sub-partners"?: any;
      "bottom-links"?: any;
      "bottom-copyright"?: string;
    };
    "dsfr-header": {
      id?: string;
      "is-mourning"?: boolean;
      "menu-id"?: string;
      "menu-modal-id"?: string;
      "has-tool-links"?: boolean;
      "tool-links"?: any;
      "duplicate-tool-links"?: boolean;
      "has-translate"?: boolean;
      "translate-id"?: string;
      "translate-collapse-id"?: string;
      "translate-button-title"?: string;
      "translate-button-kind"?: any;
      "translate-languages"?: any;
      "has-search"?: boolean;
      "search-id"?: string;
      "search-modal-id"?: string;
      "search-btn-id"?: string;
      "search-input-id"?: string;
      "search-label"?: string;
      "search-placeholder"?: string;
      "search-title"?: string;
      "brand-logo-title"?: string;
      "brand-service"?: string;
      "has-brand-tagline"?: boolean;
      "brand-tagline"?: string;
      "brand-link-id"?: string;
      "brand-link-title"?: string;
      "brand-link-href"?: string;
      "has-brand-operator"?: boolean;
      "brand-operator-alt"?: string;
      "brand-operator-src"?: string;
      "brand-operator-style"?: string;
      "has-navigation"?: boolean;
      "navigation-id"?: string;
      "navigation-aria-label"?: string;
      "navigation-items"?: any;
      "has-header-tag"?: boolean;
    };
    "dsfr-highlight": {
      text?: string;
      id?: string;
      size?: any;
      accent?: any;
    };
    "dsfr-input": {
      id?: string;
      label?: string;
      hint?: string;
      type?: number;
      icon?: string;
      value?: string;
      placeholder?: string;
      name?: string;
      autocomplete?: string;
      disabled?: boolean;
      status?: any;
      "error-message"?: string;
      "valid-message"?: string;
      "info-message"?: string;
      form?: string;
      max?: string;
      maxlength?: number;
      min?: string;
      minlength?: number;
      pattern?: string;
      readonly?: boolean;
      required?: boolean;
      step?: number;
    };
    "dsfr-link": {
      label?: string;
      size?: any;
      id?: string;
      disabled?: boolean;
      blank?: boolean;
      title?: string;
      href?: string;
      download?: boolean;
      detail?: string;
      hreflang?: string;
      assess?: boolean;
      "has-icon"?: boolean;
      icon?: string;
      "icon-place"?: any;
    };
    "dsfr-logo": {
      title?: string;
      size?: any;
    };
    "dsfr-navigation": {
      id?: string;
      "aria-label"?: string;
      items?: any;
    };
    "dsfr-pagination": {
      pages?: any;
      "has-first-and-last"?: boolean;
      first?: any;
      last?: any;
      "first-and-last-displayed-lg"?: boolean;
      "has-prev-and-next"?: boolean;
      prev?: any;
      next?: any;
      "prev-and-next-displayed-lg"?: boolean;
      "prev-and-next-has-lg-label"?: boolean;
      "current-page-index"?: number;
    };
    "dsfr-radio": {
      id?: string;
      name?: string;
      label?: string;
      value?: string;
      size?: any;
      hint?: string;
      rich?: boolean;
      "has-pictogram"?: boolean;
      "pictogram-name"?: string;
      "pictogram-accent"?: any;
      disabled?: boolean;
      form?: string;
      required?: boolean;
    };
    "dsfr-radios-group": {
      id?: string;
      legend?: string;
      radios?: any;
      hint?: string;
      size?: any;
      rich?: boolean;
      "has-pictogram"?: boolean;
      inline?: boolean;
      disabled?: boolean;
      value?: string;
      status?: any;
      "error-message"?: string;
      "valid-message"?: string;
    };
    "dsfr-search": {
      "input-id"?: string;
      "input-label"?: string;
      "button-label"?: string;
      "button-title"?: string;
      size?: any;
      placeholder?: string;
      value?: string;
      disabled?: boolean;
      form?: string;
      maxlength?: number;
      minlength?: number;
      name?: string;
      pattern?: string;
      readonly?: boolean;
      required?: boolean;
    };
    "dsfr-segmented": {
      size?: any;
      legend?: string;
      "legend-inline"?: boolean;
      "no-legend"?: boolean;
      hint?: string;
      "has-icon"?: boolean;
      elements?: any;
      value?: string;
    };
    "dsfr-select": {
      id?: string;
      label?: string;
      value?: string;
      "grouped-options"?: boolean;
      options?: any;
      "option-groups"?: any;
      hint?: string;
      placeholder?: string;
      "placeholder-disabled"?: boolean;
      disabled?: boolean;
      status?: any;
      "error-message"?: string;
      "valid-message"?: string;
      "info-message"?: string;
      form?: string;
      required?: boolean;
    };
    "dsfr-side-menu": {
      title?: string;
      items?: any;
      "button-label"?: string;
      "button-id"?: string;
      "title-id"?: string;
      "has-title"?: boolean;
      modifier?: any;
      "active-item"?: string;
    };
    "dsfr-skiplink": {
      items?: any;
      "aria-label"?: string;
    };
    "dsfr-stepper": {
      title?: string;
      "next-step"?: string;
      "current-step"?: number;
      "step-count"?: number;
      level?: any;
    };
    "dsfr-tag": {
      label?: string;
      type?: any;
      size?: any;
      href?: string;
      blank?: boolean;
      title?: string;
      pressed?: boolean;
      disabled?: boolean;
      "has-icon"?: boolean;
      icon?: string;
      accent?: any;
    };
    "dsfr-tags-group": {
      tags?: any;
      type?: any;
      size?: any;
      "group-markup"?: any;
      "has-icon"?: boolean;
    };
    "dsfr-textarea": {
      id?: string;
      label?: string;
      hint?: string;
      value?: string;
      placeholder?: string;
      name?: string;
      autocomplete?: string;
      disabled?: boolean;
      status?: any;
      "error-message"?: string;
      "valid-message"?: string;
      rows?: number;
      "info-message"?: string;
    };
    "dsfr-tile": {
      title?: string;
      "has-description"?: boolean;
      description?: string;
      "has-details"?: boolean;
      details?: string;
      "markup-level"?: any;
      "pictogram-name"?: string;
      "has-badge"?: boolean;
      "has-tag"?: boolean;
      enlarge?: boolean;
      "action-markup"?: any;
      href?: string;
      "action-title"?: string;
      "no-link"?: boolean;
      disabled?: boolean;
      blank?: boolean;
      download?: boolean;
      lang?: string;
      assess?: boolean;
      "assess-bytes"?: boolean;
      size?: any;
      horizontal?: boolean;
      "vertical-breakpoint"?: any;
      variations?: any;
    };
    "dsfr-toggle": {
      id?: string;
      label?: string;
      hint?: string;
      "hint-id"?: string;
      disabled?: boolean;
      checked?: boolean;
      border?: boolean;
      left?: boolean;
      state?: boolean;
      status?: any;
      "error-message"?: string;
      "valid-message"?: string;
      form?: string;
      required?: boolean;
    };
    "dsfr-translate": {
      id?: string;
      "collapse-id"?: string;
      "no-border"?: boolean;
      languages?: any;
      "button-id"?: string;
      "button-title"?: string;
      "button-kind"?: any;
    };
    "lab-anssi-alerte": {
      description?: string;
      type?: string;
      fermable?: boolean;
    };
    "lab-anssi-ancres": {
      ancres?: any;
      "index-actif"?: number;
    };
    "lab-anssi-bandeau-titre": {
      titre?: string;
      description?: string;
      "fil-ariane"?: any;
      "infos-tag"?: any;
    };
    "lab-anssi-bouton": {
      titre?: string;
      variante?: string;
      taille?: string;
      icone?: string;
      "position-icone"?: string;
      actif?: boolean;
      "largeur-maximale"?: boolean;
    };
    "lab-anssi-bouton-suite-cyber-navigation": {
      "source-utm"?: string;
    };
    "lab-anssi-brique-contenu-a-deux-colonnes": {
      titre?: string;
      paragraphe?: string;
      action?: any;
      ordre?: any;
      illustration?: any;
    };
    "lab-anssi-brique-hero": {
      titre?: string;
      soustitre?: string;
      illustration?: any;
      badge?: boolean;
      actiongauche?: any;
      actiondroite?: any;
      partenaires?: any;
    };
    "lab-anssi-brique-rejoindre-la-communaute": {
      titre?: string;
      raisons?: string;
      action?: any;
      illustration?: any;
    };
    "lab-anssi-carrousel-tuiles": {
      tuiles?: any;
    };
    "lab-anssi-centre-aide": {
      "nom-service"?: string;
      liens?: string;
    };
    "lab-anssi-filtres": {
      filtres?: any;
      horizontal?: boolean;
      valeur?: string;
    };
    "lab-anssi-hero": {
      titre?: string;
      "balise-titre"?: string;
      description?: string;
      inverse?: boolean;
      "url-image"?: string;
      "sans-image"?: boolean;
    };
    "lab-anssi-icone": {
      nom?: string;
      taille?: any;
    };
    "lab-anssi-lien": {
      titre?: string;
      href?: string;
      variante?: any;
      taille?: any;
      icone?: string;
      apparence?: any;
      cible?: string;
      "position-icone"?: any;
      actif?: boolean;
      "largeur-maximale"?: boolean;
    };
    "lab-anssi-liste-articles": {
      articles?: any;
      categories?: any;
      "id-categorie-choisie"?: string;
    };
    "lab-anssi-marelle": {
      titre?: string;
      etapesmarelle?: any;
      action?: any;
    };
    "lab-anssi-marelle-etape": {
      index?: number;
      "etape-marelle"?: any;
      pair?: boolean;
    };
    "lab-anssi-mes-services-cyber-bandeau": {};
    "lab-anssi-mes-services-cyber-lien-diagnostic-cyber": {
      lien?: any;
      "vers-externe"?: boolean;
    };
    "lab-anssi-multi-select": {
      id?: string;
      label?: string;
      options?: any;
      hint?: string;
      placeholder?: string;
      disabled?: boolean;
      values?: string;
      status?: any;
      "error-message"?: string;
      "valid-message"?: string;
    };
    "lab-anssi-navigation-pied-de-page": {
      conforme?: boolean;
    };
    "lab-anssi-page-crisp": {
      contenu?: string;
      "table-des-matieres"?: any;
    };
    "lab-anssi-presentation-anssi": {};
    "lab-anssi-reactions": {
      reactions?: any;
      variant?: any;
      "tooltip-texte"?: string;
      "tooltip-id"?: string;
    };
    "lab-anssi-resume-pssi": {
      "nom-service"?: string;
    };
    "lab-anssi-tag": {
      label?: string;
      "couleur-texte"?: string;
      "couleur-fond"?: string;
      taille?: any;
      type?: any;
      presse?: boolean;
    };
    "lab-anssi-temoignages": {
      titre?: string;
      temoignages?: any;
    };
    "lab-anssi-titre-multimedia": {
      titre?: string;
      multimedia?: any;
    };
  }
}
