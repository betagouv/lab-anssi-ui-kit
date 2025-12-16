<script lang="ts">
  interface Props {
    id?: string;
    isMourning?: boolean;
    brandLogoTitle?: string;
    brandLinkTitle?: string;
    brandLinkHref?: string;
    brandLinkId?: string;
    hasBrandOperator?: boolean;
    brandOperatorAlt?: string;
    brandOperatorSrc?: string;
    brandOperatorStyle?: string;
    hasDescription?: boolean;
    contentDescription?: string;
    hasPartners?: boolean;
    partnerTitle: string;
    mainPartnerSrc?: string;
    mainPartnerHref?: string;
    mainPartnerAlt?: string;
    mainPartnerStyle?: string;
    subPartners?: SubPartner[];
    bottomLinks?: BottomLink[];
    bottomCopyright?: string;
  }

  let { id, isMourning, brandLogoTitle, brandLinkTitle, brandLinkHref, brandLinkId, hasBrandOperator, brandOperatorAlt, brandOperatorSrc, brandOperatorStyle, hasDescription, contentDescription, hasPartners, partnerTitle, mainPartnerSrc, mainPartnerHref, mainPartnerAlt, mainPartnerStyle, subPartners, bottomLinks, bottomCopyright }: Props = $props();
</script>

<dsfr-footer
  {id}
  is-mourning={isMourning}
  brand-logo-title={brandLogoTitle}
  brand-link-title={brandLinkTitle}
  brand-link-href={brandLinkHref}
  brand-link-id={brandLinkId}
  has-brand-operator={hasBrandOperator}
  brand-operator-alt={brandOperatorAlt}
  brand-operator-src={brandOperatorSrc}
  brand-operator-style={brandOperatorStyle}
  has-description={hasDescription}
  content-description={contentDescription}
  has-partners={hasPartners}
  partner-title={partnerTitle}
  main-partner-src={mainPartnerSrc}
  main-partner-href={mainPartnerHref}
  main-partner-alt={mainPartnerAlt}
  main-partner-style={mainPartnerStyle}
  sub-partners={subPartners}
  bottom-links={bottomLinks}
  bottom-copyright={bottomCopyright}
></dsfr-footer>
