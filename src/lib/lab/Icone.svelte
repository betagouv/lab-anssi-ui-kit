<script lang="ts">
    export let nom: string;
</script>

<span class="icone fr-icon-{nom}"></span>

<style lang="scss">
  .icone {
    font-family: Marianne, arial, sans-serif;

    &:before {
      content: "";
      --icon-size: 1.5rem;
      background-color: currentColor;
      display: inline-block;
      flex: 0 0 auto;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      vertical-align: calc((.75em - var(--icon-size)) * .5);
      width: var(--icon-size);
      height: var(--icon-size);
    }
  }

  .fr-icon-ancient-gate-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/ancient-gate-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/ancient-gate-fill.svg");
  }

  .fr-icon-ancient-gate-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/ancient-gate-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/ancient-gate-line.svg");
  }

  .fr-icon-ancient-pavilion-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/ancient-pavilion-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/ancient-pavilion-fill.svg");
  }

  .fr-icon-ancient-pavilion-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/ancient-pavilion-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/ancient-pavilion-line.svg");
  }

  .fr-icon-bank-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/bank-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/bank-fill.svg");
  }

  .fr-icon-bank-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/bank-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/bank-line.svg");
  }

  .fr-icon-building-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/building-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/building-fill.svg");
  }

  .fr-icon-building-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/building-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/building-line.svg");
  }

  .fr-icon-community-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/community-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/community-fill.svg");
  }

  .fr-icon-community-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/community-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/community-line.svg");
  }

  .fr-icon-government-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/government-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/government-fill.svg");
  }

  .fr-icon-government-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/government-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/government-line.svg");
  }

  .fr-icon-home-4-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/home-4-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/home-4-fill.svg");
  }

  .fr-icon-home-4-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/home-4-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/home-4-line.svg");
  }

  .fr-icon-hospital-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/hospital-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/hospital-fill.svg");
  }

  .fr-icon-hospital-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/hospital-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/hospital-line.svg");
  }

  .fr-icon-hotel-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/hotel-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/hotel-fill.svg");
  }

  .fr-icon-hotel-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/hotel-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/hotel-line.svg");
  }

  .fr-icon-store-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/store-fill.svg");
    mask-image: url-asset("/icones/dsfr/buildings/store-fill.svg");
  }

  .fr-icon-store-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/buildings/store-line.svg");
    mask-image: url-asset("/icones/dsfr/buildings/store-line.svg");
  }

  .fr-icon-archive-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/archive-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/archive-fill.svg");
  }

  .fr-icon-archive-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/archive-line.svg");
    mask-image: url-asset("/icones/dsfr/business/archive-line.svg");
  }

  .fr-icon-attachment-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/attachment-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/attachment-fill.svg");
  }

  .fr-icon-attachment-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/attachment-line.svg");
    mask-image: url-asset("/icones/dsfr/business/attachment-line.svg");
  }

  .fr-icon-award-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/award-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/award-fill.svg");
  }

  .fr-icon-award-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/award-line.svg");
    mask-image: url-asset("/icones/dsfr/business/award-line.svg");
  }

  .fr-icon-bar-chart-box-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/bar-chart-box-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/bar-chart-box-fill.svg");
  }

  .fr-icon-bar-chart-box-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/bar-chart-box-line.svg");
    mask-image: url-asset("/icones/dsfr/business/bar-chart-box-line.svg");
  }

  .fr-icon-bookmark-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/bookmark-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/bookmark-fill.svg");
  }

  .fr-icon-bookmark-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/bookmark-line.svg");
    mask-image: url-asset("/icones/dsfr/business/bookmark-line.svg");
  }

  .fr-icon-briefcase-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/briefcase-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/briefcase-fill.svg");
  }

  .fr-icon-briefcase-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/briefcase-line.svg");
    mask-image: url-asset("/icones/dsfr/business/briefcase-line.svg");
  }

  .fr-icon-calendar-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/calendar-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/calendar-2-fill.svg");
  }

  .fr-icon-calendar-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/calendar-2-line.svg");
    mask-image: url-asset("/icones/dsfr/business/calendar-2-line.svg");
  }

  .fr-icon-calendar-event-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/calendar-event-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/calendar-event-fill.svg");
  }

  .fr-icon-calendar-event-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/calendar-event-line.svg");
    mask-image: url-asset("/icones/dsfr/business/calendar-event-line.svg");
  }

  .fr-icon-calendar-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/calendar-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/calendar-fill.svg");
  }

  .fr-icon-calendar-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/calendar-line.svg");
    mask-image: url-asset("/icones/dsfr/business/calendar-line.svg");
  }

  .fr-icon-cloud-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/cloud-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/cloud-fill.svg");
  }

  .fr-icon-cloud-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/cloud-line.svg");
    mask-image: url-asset("/icones/dsfr/business/cloud-line.svg");
  }

  .fr-icon-copyright-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/copyright-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/copyright-fill.svg");
  }

  .fr-icon-copyright-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/copyright-line.svg");
    mask-image: url-asset("/icones/dsfr/business/copyright-line.svg");
  }

  .fr-icon-customer-service-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/customer-service-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/customer-service-fill.svg");
  }

  .fr-icon-customer-service-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/customer-service-line.svg");
    mask-image: url-asset("/icones/dsfr/business/customer-service-line.svg");
  }

  .fr-icon-flag-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/flag-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/flag-fill.svg");
  }

  .fr-icon-flag-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/flag-line.svg");
    mask-image: url-asset("/icones/dsfr/business/flag-line.svg");
  }

  .fr-icon-global-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/global-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/global-fill.svg");
  }

  .fr-icon-global-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/global-line.svg");
    mask-image: url-asset("/icones/dsfr/business/global-line.svg");
  }

  .fr-icon-line-chart-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/line-chart-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/line-chart-fill.svg");
  }

  .fr-icon-line-chart-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/line-chart-line.svg");
    mask-image: url-asset("/icones/dsfr/business/line-chart-line.svg");
  }

  .fr-icon-links-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/links-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/links-fill.svg");
  }

  .fr-icon-links-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/links-line.svg");
    mask-image: url-asset("/icones/dsfr/business/links-line.svg");
  }

  .fr-icon-mail-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/mail-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/mail-fill.svg");
  }

  .fr-icon-mail-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/mail-line.svg");
    mask-image: url-asset("/icones/dsfr/business/mail-line.svg");
  }

  .fr-icon-mail-open-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/mail-open-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/mail-open-fill.svg");
  }

  .fr-icon-mail-open-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/mail-open-line.svg");
    mask-image: url-asset("/icones/dsfr/business/mail-open-line.svg");
  }

  .fr-icon-medal-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/medal-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/medal-fill.svg");
  }

  .fr-icon-medal-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/medal-line.svg");
    mask-image: url-asset("/icones/dsfr/business/medal-line.svg");
  }

  .fr-icon-pie-chart-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/pie-chart-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/pie-chart-2-fill.svg");
  }

  .fr-icon-pie-chart-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/pie-chart-2-line.svg");
    mask-image: url-asset("/icones/dsfr/business/pie-chart-2-line.svg");
  }

  .fr-icon-pie-chart-box-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/pie-chart-box-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/pie-chart-box-fill.svg");
  }

  .fr-icon-pie-chart-box-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/pie-chart-box-line.svg");
    mask-image: url-asset("/icones/dsfr/business/pie-chart-box-line.svg");
  }

  .fr-icon-printer-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/printer-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/printer-fill.svg");
  }

  .fr-icon-printer-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/printer-line.svg");
    mask-image: url-asset("/icones/dsfr/business/printer-line.svg");
  }

  .fr-icon-profil-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/profil-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/profil-fill.svg");
  }

  .fr-icon-profil-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/profil-line.svg");
    mask-image: url-asset("/icones/dsfr/business/profil-line.svg");
  }

  .fr-icon-projector-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/projector-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/projector-2-fill.svg");
  }

  .fr-icon-projector-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/projector-2-line.svg");
    mask-image: url-asset("/icones/dsfr/business/projector-2-line.svg");
  }

  .fr-icon-send-plane-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/send-plane-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/send-plane-fill.svg");
  }

  .fr-icon-send-plane-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/send-plane-line.svg");
    mask-image: url-asset("/icones/dsfr/business/send-plane-line.svg");
  }

  .fr-icon-slideshow-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/slideshow-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/slideshow-fill.svg");
  }

  .fr-icon-slideshow-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/slideshow-line.svg");
    mask-image: url-asset("/icones/dsfr/business/slideshow-line.svg");
  }

  .fr-icon-window-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/window-fill.svg");
    mask-image: url-asset("/icones/dsfr/business/window-fill.svg");
  }

  .fr-icon-window-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/business/window-line.svg");
    mask-image: url-asset("/icones/dsfr/business/window-line.svg");
  }

  .fr-icon-chat-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-2-fill.svg");
  }

  .fr-icon-chat-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-2-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-2-line.svg");
  }

  .fr-icon-chat-3-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-3-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-3-fill.svg");
  }

  .fr-icon-chat-3-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-3-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-3-line.svg");
  }

  .fr-icon-chat-check-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-check-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-check-fill.svg");
  }

  .fr-icon-chat-check-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-check-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-check-line.svg");
  }

  .fr-icon-chat-delete-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-delete-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-delete-fill.svg");
  }

  .fr-icon-chat-delete-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-delete-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-delete-line.svg");
  }

  .fr-icon-chat-poll-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-poll-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-poll-fill.svg");
  }

  .fr-icon-chat-poll-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/chat-poll-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/chat-poll-line.svg");
  }

  .fr-icon-discuss-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/discuss-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/discuss-fill.svg");
  }

  .fr-icon-discuss-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/discuss-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/discuss-line.svg");
  }

  .fr-icon-feedback-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/feedback-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/feedback-fill.svg");
  }

  .fr-icon-feedback-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/feedback-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/feedback-line.svg");
  }

  .fr-icon-message-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/message-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/message-2-fill.svg");
  }

  .fr-icon-message-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/message-2-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/message-2-line.svg");
  }

  .fr-icon-question-answer-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/question-answer-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/question-answer-fill.svg");
  }

  .fr-icon-question-answer-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/question-answer-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/question-answer-line.svg");
  }

  .fr-icon-questionnaire-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/questionnaire-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/questionnaire-fill.svg");
  }

  .fr-icon-questionnaire-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/questionnaire-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/questionnaire-line.svg");
  }

  .fr-icon-video-chat-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/video-chat-fill.svg");
    mask-image: url-asset("/icones/dsfr/communication/video-chat-fill.svg");
  }

  .fr-icon-video-chat-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/communication/video-chat-line.svg");
    mask-image: url-asset("/icones/dsfr/communication/video-chat-line.svg");
  }

  .fr-icon-ball-pen-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/ball-pen-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/ball-pen-fill.svg");
  }

  .fr-icon-ball-pen-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/ball-pen-line.svg");
    mask-image: url-asset("/icones/dsfr/design/ball-pen-line.svg");
  }

  .fr-icon-brush-3-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/brush-3-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/brush-3-fill.svg");
  }

  .fr-icon-brush-3-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/brush-3-line.svg");
    mask-image: url-asset("/icones/dsfr/design/brush-3-line.svg");
  }

  .fr-icon-brush-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/brush-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/brush-fill.svg");
  }

  .fr-icon-brush-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/brush-line.svg");
    mask-image: url-asset("/icones/dsfr/design/brush-line.svg");
  }

  .fr-icon-contrast-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/contrast-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/contrast-fill.svg");
  }

  .fr-icon-contrast-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/contrast-line.svg");
    mask-image: url-asset("/icones/dsfr/design/contrast-line.svg");
  }

  .fr-icon-crop-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/crop-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/crop-fill.svg");
  }

  .fr-icon-crop-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/crop-line.svg");
    mask-image: url-asset("/icones/dsfr/design/crop-line.svg");
  }

  .fr-icon-drag-move-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/drag-move-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/drag-move-2-fill.svg");
  }

  .fr-icon-drag-move-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/drag-move-2-line.svg");
    mask-image: url-asset("/icones/dsfr/design/drag-move-2-line.svg");
  }

  .fr-icon-drop-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/drop-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/drop-fill.svg");
  }

  .fr-icon-drop-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/drop-line.svg");
    mask-image: url-asset("/icones/dsfr/design/drop-line.svg");
  }

  .fr-icon-edit-box-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/edit-box-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/edit-box-fill.svg");
  }

  .fr-icon-edit-box-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/edit-box-line.svg");
    mask-image: url-asset("/icones/dsfr/design/edit-box-line.svg");
  }

  .fr-icon-edit-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/edit-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/edit-fill.svg");
  }

  .fr-icon-edit-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/edit-line.svg");
    mask-image: url-asset("/icones/dsfr/design/edit-line.svg");
  }

  .fr-icon-eraser-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/eraser-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/eraser-fill.svg");
  }

  .fr-icon-eraser-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/eraser-line.svg");
    mask-image: url-asset("/icones/dsfr/design/eraser-line.svg");
  }

  .fr-icon-ink-bottle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/ink-bottle-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/ink-bottle-fill.svg");
  }

  .fr-icon-ink-bottle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/ink-bottle-line.svg");
    mask-image: url-asset("/icones/dsfr/design/ink-bottle-line.svg");
  }

  .fr-icon-layout-grid-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/layout-grid-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/layout-grid-fill.svg");
  }

  .fr-icon-layout-grid-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/layout-grid-line.svg");
    mask-image: url-asset("/icones/dsfr/design/layout-grid-line.svg");
  }

  .fr-icon-mark-pen-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/mark-pen-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/mark-pen-fill.svg");
  }

  .fr-icon-mark-pen-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/mark-pen-line.svg");
    mask-image: url-asset("/icones/dsfr/design/mark-pen-line.svg");
  }

  .fr-icon-paint-brush-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/paint-brush-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/paint-brush-fill.svg");
  }

  .fr-icon-paint-brush-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/paint-brush-line.svg");
    mask-image: url-asset("/icones/dsfr/design/paint-brush-line.svg");
  }

  .fr-icon-paint-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/paint-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/paint-fill.svg");
  }

  .fr-icon-paint-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/paint-line.svg");
    mask-image: url-asset("/icones/dsfr/design/paint-line.svg");
  }

  .fr-icon-palette-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/palette-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/palette-fill.svg");
  }

  .fr-icon-palette-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/palette-line.svg");
    mask-image: url-asset("/icones/dsfr/design/palette-line.svg");
  }

  .fr-icon-pantone-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/pantone-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/pantone-fill.svg");
  }

  .fr-icon-pantone-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/pantone-line.svg");
    mask-image: url-asset("/icones/dsfr/design/pantone-line.svg");
  }

  .fr-icon-pen-nib-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/pen-nib-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/pen-nib-fill.svg");
  }

  .fr-icon-pen-nib-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/pen-nib-line.svg");
    mask-image: url-asset("/icones/dsfr/design/pen-nib-line.svg");
  }

  .fr-icon-pencil-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/pencil-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/pencil-fill.svg");
  }

  .fr-icon-pencil-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/pencil-line.svg");
    mask-image: url-asset("/icones/dsfr/design/pencil-line.svg");
  }

  .fr-icon-pencil-ruler-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/pencil-ruler-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/pencil-ruler-fill.svg");
  }

  .fr-icon-pencil-ruler-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/pencil-ruler-line.svg");
    mask-image: url-asset("/icones/dsfr/design/pencil-ruler-line.svg");
  }

  .fr-icon-shapes-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/shapes-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/shapes-fill.svg");
  }

  .fr-icon-shapes-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/shapes-line.svg");
    mask-image: url-asset("/icones/dsfr/design/shapes-line.svg");
  }

  .fr-icon-sip-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/sip-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/sip-fill.svg");
  }

  .fr-icon-sip-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/sip-line.svg");
    mask-image: url-asset("/icones/dsfr/design/sip-line.svg");
  }

  .fr-icon-table-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/table-fill.svg");
    mask-image: url-asset("/icones/dsfr/design/table-fill.svg");
  }

  .fr-icon-table-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/design/table-line.svg");
    mask-image: url-asset("/icones/dsfr/design/table-line.svg");
  }

  .fr-icon-bug-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/bug-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/bug-fill.svg");
  }

  .fr-icon-bug-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/bug-line.svg");
    mask-image: url-asset("/icones/dsfr/development/bug-line.svg");
  }

  .fr-icon-code-box-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/code-box-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/code-box-fill.svg");
  }

  .fr-icon-code-box-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/code-box-line.svg");
    mask-image: url-asset("/icones/dsfr/development/code-box-line.svg");
  }

  .fr-icon-code-s-slash-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/code-s-slash-line.svg");
    mask-image: url-asset("/icones/dsfr/development/code-s-slash-line.svg");
  }

  .fr-icon-cursor-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/cursor-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/cursor-fill.svg");
  }

  .fr-icon-cursor-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/cursor-line.svg");
    mask-image: url-asset("/icones/dsfr/development/cursor-line.svg");
  }

  .fr-icon-git-branch-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-branch-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/git-branch-fill.svg");
  }

  .fr-icon-git-branch-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-branch-line.svg");
    mask-image: url-asset("/icones/dsfr/development/git-branch-line.svg");
  }

  .fr-icon-git-commit-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-commit-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/git-commit-fill.svg");
  }

  .fr-icon-git-commit-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-commit-line.svg");
    mask-image: url-asset("/icones/dsfr/development/git-commit-line.svg");
  }

  .fr-icon-git-merge-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-merge-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/git-merge-fill.svg");
  }

  .fr-icon-git-merge-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-merge-line.svg");
    mask-image: url-asset("/icones/dsfr/development/git-merge-line.svg");
  }

  .fr-icon-git-pull-request-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-pull-request-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/git-pull-request-fill.svg");
  }

  .fr-icon-git-pull-request-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-pull-request-line.svg");
    mask-image: url-asset("/icones/dsfr/development/git-pull-request-line.svg");
  }

  .fr-icon-git-repository-commits-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-repository-commits-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/git-repository-commits-fill.svg");
  }

  .fr-icon-git-repository-commits-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-repository-commits-line.svg");
    mask-image: url-asset("/icones/dsfr/development/git-repository-commits-line.svg");
  }

  .fr-icon-git-repository-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-repository-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/git-repository-fill.svg");
  }

  .fr-icon-git-repository-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-repository-line.svg");
    mask-image: url-asset("/icones/dsfr/development/git-repository-line.svg");
  }

  .fr-icon-git-repository-private-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-repository-private-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/git-repository-private-fill.svg");
  }

  .fr-icon-git-repository-private-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/git-repository-private-line.svg");
    mask-image: url-asset("/icones/dsfr/development/git-repository-private-line.svg");
  }

  .fr-icon-terminal-box-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/terminal-box-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/terminal-box-fill.svg");
  }

  .fr-icon-terminal-box-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/terminal-box-line.svg");
    mask-image: url-asset("/icones/dsfr/development/terminal-box-line.svg");
  }

  .fr-icon-terminal-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/terminal-line.svg");
    mask-image: url-asset("/icones/dsfr/development/terminal-line.svg");
  }

  .fr-icon-terminal-window-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/terminal-window-fill.svg");
    mask-image: url-asset("/icones/dsfr/development/terminal-window-fill.svg");
  }

  .fr-icon-terminal-window-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/development/terminal-window-line.svg");
    mask-image: url-asset("/icones/dsfr/development/terminal-window-line.svg");
  }

  .fr-icon-bluetooth-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/bluetooth-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/bluetooth-fill.svg");
  }

  .fr-icon-bluetooth-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/bluetooth-line.svg");
    mask-image: url-asset("/icones/dsfr/device/bluetooth-line.svg");
  }

  .fr-icon-computer-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/computer-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/computer-fill.svg");
  }

  .fr-icon-computer-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/computer-line.svg");
    mask-image: url-asset("/icones/dsfr/device/computer-line.svg");
  }

  .fr-icon-dashboard-3-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/dashboard-3-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/dashboard-3-fill.svg");
  }

  .fr-icon-dashboard-3-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/dashboard-3-line.svg");
    mask-image: url-asset("/icones/dsfr/device/dashboard-3-line.svg");
  }

  .fr-icon-database-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/database-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/database-fill.svg");
  }

  .fr-icon-database-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/database-line.svg");
    mask-image: url-asset("/icones/dsfr/device/database-line.svg");
  }

  .fr-icon-device-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/device-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/device-fill.svg");
  }

  .fr-icon-device-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/device-line.svg");
    mask-image: url-asset("/icones/dsfr/device/device-line.svg");
  }

  .fr-icon-hard-drive-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/hard-drive-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/hard-drive-2-fill.svg");
  }

  .fr-icon-hard-drive-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/hard-drive-2-line.svg");
    mask-image: url-asset("/icones/dsfr/device/hard-drive-2-line.svg");
  }

  .fr-icon-mac-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/mac-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/mac-fill.svg");
  }

  .fr-icon-mac-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/mac-line.svg");
    mask-image: url-asset("/icones/dsfr/device/mac-line.svg");
  }

  .fr-icon-phone-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/phone-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/phone-fill.svg");
  }

  .fr-icon-phone-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/phone-line.svg");
    mask-image: url-asset("/icones/dsfr/device/phone-line.svg");
  }

  .fr-icon-qr-code-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/qr-code-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/qr-code-fill.svg");
  }

  .fr-icon-qr-code-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/qr-code-line.svg");
    mask-image: url-asset("/icones/dsfr/device/qr-code-line.svg");
  }

  .fr-icon-rss-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/rss-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/rss-fill.svg");
  }

  .fr-icon-rss-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/rss-line.svg");
    mask-image: url-asset("/icones/dsfr/device/rss-line.svg");
  }

  .fr-icon-save-3-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/save-3-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/save-3-fill.svg");
  }

  .fr-icon-save-3-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/save-3-line.svg");
    mask-image: url-asset("/icones/dsfr/device/save-3-line.svg");
  }

  .fr-icon-save-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/save-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/save-fill.svg");
  }

  .fr-icon-save-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/save-line.svg");
    mask-image: url-asset("/icones/dsfr/device/save-line.svg");
  }

  .fr-icon-server-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/server-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/server-fill.svg");
  }

  .fr-icon-server-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/server-line.svg");
    mask-image: url-asset("/icones/dsfr/device/server-line.svg");
  }

  .fr-icon-smartphone-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/smartphone-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/smartphone-fill.svg");
  }

  .fr-icon-smartphone-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/smartphone-line.svg");
    mask-image: url-asset("/icones/dsfr/device/smartphone-line.svg");
  }

  .fr-icon-tablet-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/tablet-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/tablet-fill.svg");
  }

  .fr-icon-tablet-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/tablet-line.svg");
    mask-image: url-asset("/icones/dsfr/device/tablet-line.svg");
  }

  .fr-icon-tv-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/tv-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/tv-fill.svg");
  }

  .fr-icon-tv-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/tv-line.svg");
    mask-image: url-asset("/icones/dsfr/device/tv-line.svg");
  }

  .fr-icon-wifi-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/wifi-fill.svg");
    mask-image: url-asset("/icones/dsfr/device/wifi-fill.svg");
  }

  .fr-icon-wifi-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/device/wifi-line.svg");
    mask-image: url-asset("/icones/dsfr/device/wifi-line.svg");
  }

  .fr-icon-article-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/article-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/article-fill.svg");
  }

  .fr-icon-article-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/article-line.svg");
    mask-image: url-asset("/icones/dsfr/document/article-line.svg");
  }

  .fr-icon-book-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/book-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/book-2-fill.svg");
  }

  .fr-icon-book-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/book-2-line.svg");
    mask-image: url-asset("/icones/dsfr/document/book-2-line.svg");
  }

  .fr-icon-booklet-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/booklet-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/booklet-fill.svg");
  }

  .fr-icon-booklet-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/booklet-line.svg");
    mask-image: url-asset("/icones/dsfr/document/booklet-line.svg");
  }

  .fr-icon-clipboard-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/clipboard-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/clipboard-fill.svg");
  }

  .fr-icon-clipboard-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/clipboard-line.svg");
    mask-image: url-asset("/icones/dsfr/document/clipboard-line.svg");
  }

  .fr-icon-draft-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/draft-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/draft-fill.svg");
  }

  .fr-icon-draft-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/draft-line.svg");
    mask-image: url-asset("/icones/dsfr/document/draft-line.svg");
  }

  .fr-icon-file-add-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-add-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/file-add-fill.svg");
  }

  .fr-icon-file-add-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-add-line.svg");
    mask-image: url-asset("/icones/dsfr/document/file-add-line.svg");
  }

  .fr-icon-file-download-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-download-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/file-download-fill.svg");
  }

  .fr-icon-file-download-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-download-line.svg");
    mask-image: url-asset("/icones/dsfr/document/file-download-line.svg");
  }

  .fr-icon-file-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/file-fill.svg");
  }

  .fr-icon-file-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-line.svg");
    mask-image: url-asset("/icones/dsfr/document/file-line.svg");
  }

  .fr-icon-file-pdf-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-pdf-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/file-pdf-fill.svg");
  }

  .fr-icon-file-pdf-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-pdf-line.svg");
    mask-image: url-asset("/icones/dsfr/document/file-pdf-line.svg");
  }

  .fr-icon-file-text-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-text-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/file-text-fill.svg");
  }

  .fr-icon-file-text-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/file-text-line.svg");
    mask-image: url-asset("/icones/dsfr/document/file-text-line.svg");
  }

  .fr-icon-folder-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/folder-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/folder-2-fill.svg");
  }

  .fr-icon-folder-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/folder-2-line.svg");
    mask-image: url-asset("/icones/dsfr/document/folder-2-line.svg");
  }

  .fr-icon-newspaper-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/newspaper-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/newspaper-fill.svg");
  }

  .fr-icon-newspaper-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/newspaper-line.svg");
    mask-image: url-asset("/icones/dsfr/document/newspaper-line.svg");
  }

  .fr-icon-survey-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/survey-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/survey-fill.svg");
  }

  .fr-icon-survey-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/survey-line.svg");
    mask-image: url-asset("/icones/dsfr/document/survey-line.svg");
  }

  .fr-icon-todo-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/todo-fill.svg");
    mask-image: url-asset("/icones/dsfr/document/todo-fill.svg");
  }

  .fr-icon-todo-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/document/todo-line.svg");
    mask-image: url-asset("/icones/dsfr/document/todo-line.svg");
  }

  .fr-icon-align-center:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/align-center.svg");
    mask-image: url-asset("/icones/dsfr/editor/align-center.svg");
  }

  .fr-icon-align-justify:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/align-justify.svg");
    mask-image: url-asset("/icones/dsfr/editor/align-justify.svg");
  }

  .fr-icon-align-left:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/align-left.svg");
    mask-image: url-asset("/icones/dsfr/editor/align-left.svg");
  }

  .fr-icon-align-right:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/align-right.svg");
    mask-image: url-asset("/icones/dsfr/editor/align-right.svg");
  }

  .fr-icon-code-block:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/code-block.svg");
    mask-image: url-asset("/icones/dsfr/editor/code-block.svg");
  }

  .fr-icon-code-view:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/code-view.svg");
    mask-image: url-asset("/icones/dsfr/editor/code-view.svg");
  }

  .fr-icon-font-color:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/font-color.svg");
    mask-image: url-asset("/icones/dsfr/editor/font-color.svg");
  }

  .fr-icon-font-size:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/font-size.svg");
    mask-image: url-asset("/icones/dsfr/editor/font-size.svg");
  }

  .fr-icon-format-clear:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/format-clear.svg");
    mask-image: url-asset("/icones/dsfr/editor/format-clear.svg");
  }

  .fr-icon-bold:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/fr--bold.svg");
    mask-image: url-asset("/icones/dsfr/editor/fr--bold.svg");
  }

  .fr-icon-highlight:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/fr--highlight.svg");
    mask-image: url-asset("/icones/dsfr/editor/fr--highlight.svg");
  }

  .fr-icon-quote-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/fr--quote-fill.svg");
    mask-image: url-asset("/icones/dsfr/editor/fr--quote-fill.svg");
  }

  .fr-icon-quote-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/fr--quote-line.svg");
    mask-image: url-asset("/icones/dsfr/editor/fr--quote-line.svg");
  }

  .fr-icon-h-1:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/h-1.svg");
    mask-image: url-asset("/icones/dsfr/editor/h-1.svg");
  }

  .fr-icon-h-2:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/h-2.svg");
    mask-image: url-asset("/icones/dsfr/editor/h-2.svg");
  }

  .fr-icon-h-3:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/h-3.svg");
    mask-image: url-asset("/icones/dsfr/editor/h-3.svg");
  }

  .fr-icon-h-4:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/h-4.svg");
    mask-image: url-asset("/icones/dsfr/editor/h-4.svg");
  }

  .fr-icon-h-5:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/h-5.svg");
    mask-image: url-asset("/icones/dsfr/editor/h-5.svg");
  }

  .fr-icon-h-6:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/h-6.svg");
    mask-image: url-asset("/icones/dsfr/editor/h-6.svg");
  }

  .fr-icon-hashtag:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/hashtag.svg");
    mask-image: url-asset("/icones/dsfr/editor/hashtag.svg");
  }

  .fr-icon-indent-decrease:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/indent-decrease.svg");
    mask-image: url-asset("/icones/dsfr/editor/indent-decrease.svg");
  }

  .fr-icon-indent-increase:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/indent-increase.svg");
    mask-image: url-asset("/icones/dsfr/editor/indent-increase.svg");
  }

  .fr-icon-italic:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/italic.svg");
    mask-image: url-asset("/icones/dsfr/editor/italic.svg");
  }

  .fr-icon-link-unlink:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/link-unlink.svg");
    mask-image: url-asset("/icones/dsfr/editor/link-unlink.svg");
  }

  .fr-icon-link:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/link.svg");
    mask-image: url-asset("/icones/dsfr/editor/link.svg");
  }

  .fr-icon-list-check:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/list-check.svg");
    mask-image: url-asset("/icones/dsfr/editor/list-check.svg");
  }

  .fr-icon-list-ordered:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/list-ordered.svg");
    mask-image: url-asset("/icones/dsfr/editor/list-ordered.svg");
  }

  .fr-icon-list-unordered:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/list-unordered.svg");
    mask-image: url-asset("/icones/dsfr/editor/list-unordered.svg");
  }

  .fr-icon-question-mark:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/question-mark.svg");
    mask-image: url-asset("/icones/dsfr/editor/question-mark.svg");
  }

  .fr-icon-separator:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/separator.svg");
    mask-image: url-asset("/icones/dsfr/editor/separator.svg");
  }

  .fr-icon-space:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/space.svg");
    mask-image: url-asset("/icones/dsfr/editor/space.svg");
  }

  .fr-icon-strikethrough:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/strikethrough.svg");
    mask-image: url-asset("/icones/dsfr/editor/strikethrough.svg");
  }

  .fr-icon-subscript:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/subscript.svg");
    mask-image: url-asset("/icones/dsfr/editor/subscript.svg");
  }

  .fr-icon-superscript:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/superscript.svg");
    mask-image: url-asset("/icones/dsfr/editor/superscript.svg");
  }

  .fr-icon-table-2:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/table-2.svg");
    mask-image: url-asset("/icones/dsfr/editor/table-2.svg");
  }

  .fr-icon-text-direction-r:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/text-direction-r.svg");
    mask-image: url-asset("/icones/dsfr/editor/text-direction-r.svg");
  }

  .fr-icon-translate-2:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/translate-2.svg");
    mask-image: url-asset("/icones/dsfr/editor/translate-2.svg");
  }

  .fr-icon-underline:before {
    -webkit-mask-image: url-asset("/icones/dsfr/editor/underline.svg");
    mask-image: url-asset("/icones/dsfr/editor/underline.svg");
  }

  .fr-icon-bank-card-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/bank-card-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/bank-card-fill.svg");
  }

  .fr-icon-bank-card-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/bank-card-line.svg");
    mask-image: url-asset("/icones/dsfr/finance/bank-card-line.svg");
  }

  .fr-icon-coin-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/coin-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/coin-fill.svg");
  }

  .fr-icon-gift-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/gift-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/gift-fill.svg");
  }

  .fr-icon-gift-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/gift-line.svg");
    mask-image: url-asset("/icones/dsfr/finance/gift-line.svg");
  }

  .fr-icon-money-euro-box-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/money-euro-box-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/money-euro-box-fill.svg");
  }

  .fr-icon-money-euro-box-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/money-euro-box-line.svg");
    mask-image: url-asset("/icones/dsfr/finance/money-euro-box-line.svg");
  }

  .fr-icon-money-euro-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/money-euro-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/money-euro-circle-fill.svg");
  }

  .fr-icon-money-euro-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/money-euro-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/finance/money-euro-circle-line.svg");
  }

  .fr-icon-secure-payment-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/secure-payment-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/secure-payment-fill.svg");
  }

  .fr-icon-secure-payment-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/secure-payment-line.svg");
    mask-image: url-asset("/icones/dsfr/finance/secure-payment-line.svg");
  }

  .fr-icon-shopping-bag-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/shopping-bag-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/shopping-bag-fill.svg");
  }

  .fr-icon-shopping-bag-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/shopping-bag-line.svg");
    mask-image: url-asset("/icones/dsfr/finance/shopping-bag-line.svg");
  }

  .fr-icon-shopping-cart-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/shopping-cart-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/shopping-cart-2-fill.svg");
  }

  .fr-icon-shopping-cart-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/shopping-cart-2-line.svg");
    mask-image: url-asset("/icones/dsfr/finance/shopping-cart-2-line.svg");
  }

  .fr-icon-trophy-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/trophy-fill.svg");
    mask-image: url-asset("/icones/dsfr/finance/trophy-fill.svg");
  }

  .fr-icon-trophy-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/finance/trophy-line.svg");
    mask-image: url-asset("/icones/dsfr/finance/trophy-line.svg");
  }

  .fr-icon-capsule-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/capsule-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/capsule-fill.svg");
  }

  .fr-icon-capsule-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/capsule-line.svg");
    mask-image: url-asset("/icones/dsfr/health/capsule-line.svg");
  }

  .fr-icon-dislike-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/dislike-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/dislike-fill.svg");
  }

  .fr-icon-dislike-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/dislike-line.svg");
    mask-image: url-asset("/icones/dsfr/health/dislike-line.svg");
  }

  .fr-icon-dossier-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/dossier-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/dossier-fill.svg");
  }

  .fr-icon-dossier-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/dossier-line.svg");
    mask-image: url-asset("/icones/dsfr/health/dossier-line.svg");
  }

  .fr-icon-first-aid-kit-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/first-aid-kit-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/first-aid-kit-fill.svg");
  }

  .fr-icon-first-aid-kit-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/first-aid-kit-line.svg");
    mask-image: url-asset("/icones/dsfr/health/first-aid-kit-line.svg");
  }

  .fr-icon-hand-sanitizer-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/hand-sanitizer-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/hand-sanitizer-fill.svg");
  }

  .fr-icon-hand-sanitizer-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/hand-sanitizer-line.svg");
    mask-image: url-asset("/icones/dsfr/health/hand-sanitizer-line.svg");
  }

  .fr-icon-health-book-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/health-book-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/health-book-fill.svg");
  }

  .fr-icon-health-book-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/health-book-line.svg");
    mask-image: url-asset("/icones/dsfr/health/health-book-line.svg");
  }

  .fr-icon-heart-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/heart-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/heart-fill.svg");
  }

  .fr-icon-heart-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/heart-line.svg");
    mask-image: url-asset("/icones/dsfr/health/heart-line.svg");
  }

  .fr-icon-heart-pulse-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/heart-pulse-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/heart-pulse-fill.svg");
  }

  .fr-icon-heart-pulse-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/heart-pulse-line.svg");
    mask-image: url-asset("/icones/dsfr/health/heart-pulse-line.svg");
  }

  .fr-icon-lungs-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/lungs-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/lungs-fill.svg");
  }

  .fr-icon-lungs-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/lungs-line.svg");
    mask-image: url-asset("/icones/dsfr/health/lungs-line.svg");
  }

  .fr-icon-medicine-bottle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/medicine-bottle-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/medicine-bottle-fill.svg");
  }

  .fr-icon-medicine-bottle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/medicine-bottle-line.svg");
    mask-image: url-asset("/icones/dsfr/health/medicine-bottle-line.svg");
  }

  .fr-icon-mental-health-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/mental-health-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/mental-health-fill.svg");
  }

  .fr-icon-mental-health-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/mental-health-line.svg");
    mask-image: url-asset("/icones/dsfr/health/mental-health-line.svg");
  }

  .fr-icon-microscope-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/microscope-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/microscope-fill.svg");
  }

  .fr-icon-microscope-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/microscope-line.svg");
    mask-image: url-asset("/icones/dsfr/health/microscope-line.svg");
  }

  .fr-icon-psychotherapy-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/psychotherapy-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/psychotherapy-fill.svg");
  }

  .fr-icon-psychotherapy-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/psychotherapy-line.svg");
    mask-image: url-asset("/icones/dsfr/health/psychotherapy-line.svg");
  }

  .fr-icon-pulse-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/pulse-line.svg");
    mask-image: url-asset("/icones/dsfr/health/pulse-line.svg");
  }

  .fr-icon-stethoscope-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/stethoscope-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/stethoscope-fill.svg");
  }

  .fr-icon-stethoscope-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/stethoscope-line.svg");
    mask-image: url-asset("/icones/dsfr/health/stethoscope-line.svg");
  }

  .fr-icon-surgical-mask-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/surgical-mask-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/surgical-mask-fill.svg");
  }

  .fr-icon-surgical-mask-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/surgical-mask-line.svg");
    mask-image: url-asset("/icones/dsfr/health/surgical-mask-line.svg");
  }

  .fr-icon-syringe-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/syringe-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/syringe-fill.svg");
  }

  .fr-icon-syringe-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/syringe-line.svg");
    mask-image: url-asset("/icones/dsfr/health/syringe-line.svg");
  }

  .fr-icon-test-tube-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/test-tube-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/test-tube-fill.svg");
  }

  .fr-icon-test-tube-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/test-tube-line.svg");
    mask-image: url-asset("/icones/dsfr/health/test-tube-line.svg");
  }

  .fr-icon-thermometer-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/thermometer-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/thermometer-fill.svg");
  }

  .fr-icon-thermometer-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/thermometer-line.svg");
    mask-image: url-asset("/icones/dsfr/health/thermometer-line.svg");
  }

  .fr-icon-virus-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/virus-fill.svg");
    mask-image: url-asset("/icones/dsfr/health/virus-fill.svg");
  }

  .fr-icon-virus-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/health/virus-line.svg");
    mask-image: url-asset("/icones/dsfr/health/virus-line.svg");
  }

  .fr-icon-bluesky-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/bluesky-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/bluesky-fill.svg");
  }

  .fr-icon-bluesky-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/bluesky-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/bluesky-line.svg");
  }

  .fr-icon-chrome-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/chrome-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/chrome-fill.svg");
  }

  .fr-icon-chrome-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/chrome-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/chrome-line.svg");
  }

  .fr-icon-edge-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/edge-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/edge-fill.svg");
  }

  .fr-icon-edge-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/edge-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/edge-line.svg");
  }

  .fr-icon-facebook-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/facebook-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/facebook-circle-fill.svg");
  }

  .fr-icon-facebook-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/facebook-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/facebook-circle-line.svg");
  }

  .fr-icon-firefox-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/firefox-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/firefox-fill.svg");
  }

  .fr-icon-firefox-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/firefox-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/firefox-line.svg");
  }

  .fr-icon-dailymotion-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/fr--dailymotion-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/fr--dailymotion-fill.svg");
  }

  .fr-icon-dailymotion-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/fr--dailymotion-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/fr--dailymotion-line.svg");
  }

  .fr-icon-tiktok-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/fr--tiktok-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/fr--tiktok-fill.svg");
  }

  .fr-icon-tiktok-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/fr--tiktok-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/fr--tiktok-line.svg");
  }

  .fr-icon-github-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/github-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/github-fill.svg");
  }

  .fr-icon-github-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/github-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/github-line.svg");
  }

  .fr-icon-google-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/google-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/google-fill.svg");
  }

  .fr-icon-google-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/google-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/google-line.svg");
  }

  .fr-icon-ie-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/ie-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/ie-fill.svg");
  }

  .fr-icon-ie-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/ie-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/ie-line.svg");
  }

  .fr-icon-instagram-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/instagram-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/instagram-fill.svg");
  }

  .fr-icon-instagram-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/instagram-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/instagram-line.svg");
  }

  .fr-icon-linkedin-box-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/linkedin-box-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/linkedin-box-fill.svg");
  }

  .fr-icon-linkedin-box-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/linkedin-box-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/linkedin-box-line.svg");
  }

  .fr-icon-mastodon-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/mastodon-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/mastodon-fill.svg");
  }

  .fr-icon-mastodon-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/mastodon-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/mastodon-line.svg");
  }

  .fr-icon-npmjs-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/npmjs-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/npmjs-fill.svg");
  }

  .fr-icon-npmjs-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/npmjs-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/npmjs-line.svg");
  }

  .fr-icon-remixicon-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/remixicon-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/remixicon-fill.svg");
  }

  .fr-icon-remixicon-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/remixicon-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/remixicon-line.svg");
  }

  .fr-icon-safari-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/safari-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/safari-fill.svg");
  }

  .fr-icon-safari-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/safari-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/safari-line.svg");
  }

  .fr-icon-slack-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/slack-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/slack-fill.svg");
  }

  .fr-icon-slack-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/slack-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/slack-line.svg");
  }

  .fr-icon-snapchat-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/snapchat-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/snapchat-fill.svg");
  }

  .fr-icon-snapchat-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/snapchat-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/snapchat-line.svg");
  }

  .fr-icon-telegram-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/telegram-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/telegram-fill.svg");
  }

  .fr-icon-telegram-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/telegram-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/telegram-line.svg");
  }

  .fr-icon-threads-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/threads-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/threads-fill.svg");
  }

  .fr-icon-threads-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/threads-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/threads-line.svg");
  }

  .fr-icon-twitch-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/twitch-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/twitch-fill.svg");
  }

  .fr-icon-twitch-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/twitch-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/twitch-line.svg");
  }

  .fr-icon-twitter-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/twitter-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/twitter-fill.svg");
  }

  .fr-icon-twitter-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/twitter-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/twitter-line.svg");
  }

  .fr-icon-twitter-x-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/twitter-x-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/twitter-x-fill.svg");
  }

  .fr-icon-twitter-x-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/twitter-x-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/twitter-x-line.svg");
  }

  .fr-icon-vimeo-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/vimeo-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/vimeo-fill.svg");
  }

  .fr-icon-vimeo-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/vimeo-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/vimeo-line.svg");
  }

  .fr-icon-vuejs-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/vuejs-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/vuejs-fill.svg");
  }

  .fr-icon-vuejs-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/vuejs-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/vuejs-line.svg");
  }

  .fr-icon-whatsapp-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/whatsapp-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/whatsapp-fill.svg");
  }

  .fr-icon-whatsapp-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/whatsapp-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/whatsapp-line.svg");
  }

  .fr-icon-youtube-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/youtube-fill.svg");
    mask-image: url-asset("/icones/dsfr/logo/youtube-fill.svg");
  }

  .fr-icon-youtube-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/logo/youtube-line.svg");
    mask-image: url-asset("/icones/dsfr/logo/youtube-line.svg");
  }

  .fr-icon-anchor-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/anchor-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/anchor-fill.svg");
  }

  .fr-icon-anchor-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/anchor-line.svg");
    mask-image: url-asset("/icones/dsfr/map/anchor-line.svg");
  }

  .fr-icon-bike-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/bike-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/bike-fill.svg");
  }

  .fr-icon-bike-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/bike-line.svg");
    mask-image: url-asset("/icones/dsfr/map/bike-line.svg");
  }

  .fr-icon-bus-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/bus-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/bus-fill.svg");
  }

  .fr-icon-bus-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/bus-line.svg");
    mask-image: url-asset("/icones/dsfr/map/bus-line.svg");
  }

  .fr-icon-car-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/car-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/car-fill.svg");
  }

  .fr-icon-car-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/car-line.svg");
    mask-image: url-asset("/icones/dsfr/map/car-line.svg");
  }

  .fr-icon-caravan-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/caravan-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/caravan-fill.svg");
  }

  .fr-icon-caravan-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/caravan-line.svg");
    mask-image: url-asset("/icones/dsfr/map/caravan-line.svg");
  }

  .fr-icon-charging-pile-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/charging-pile-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/charging-pile-2-fill.svg");
  }

  .fr-icon-charging-pile-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/charging-pile-2-line.svg");
    mask-image: url-asset("/icones/dsfr/map/charging-pile-2-line.svg");
  }

  .fr-icon-compass-3-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/compass-3-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/compass-3-fill.svg");
  }

  .fr-icon-compass-3-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/compass-3-line.svg");
    mask-image: url-asset("/icones/dsfr/map/compass-3-line.svg");
  }

  .fr-icon-cup-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/cup-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/cup-fill.svg");
  }

  .fr-icon-cup-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/cup-line.svg");
    mask-image: url-asset("/icones/dsfr/map/cup-line.svg");
  }

  .fr-icon-earth-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/earth-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/earth-fill.svg");
  }

  .fr-icon-earth-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/earth-line.svg");
    mask-image: url-asset("/icones/dsfr/map/earth-line.svg");
  }

  .fr-icon-france-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/france-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/france-fill.svg");
  }

  .fr-icon-france-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/france-line.svg");
    mask-image: url-asset("/icones/dsfr/map/france-line.svg");
  }

  .fr-icon-gas-station-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/gas-station-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/gas-station-fill.svg");
  }

  .fr-icon-gas-station-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/gas-station-line.svg");
    mask-image: url-asset("/icones/dsfr/map/gas-station-line.svg");
  }

  .fr-icon-goblet-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/goblet-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/goblet-fill.svg");
  }

  .fr-icon-goblet-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/goblet-line.svg");
    mask-image: url-asset("/icones/dsfr/map/goblet-line.svg");
  }

  .fr-icon-map-pin-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/map-pin-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/map-pin-2-fill.svg");
  }

  .fr-icon-map-pin-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/map-pin-2-line.svg");
    mask-image: url-asset("/icones/dsfr/map/map-pin-2-line.svg");
  }

  .fr-icon-map-pin-user-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/map-pin-user-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/map-pin-user-fill.svg");
  }

  .fr-icon-map-pin-user-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/map-pin-user-line.svg");
    mask-image: url-asset("/icones/dsfr/map/map-pin-user-line.svg");
  }

  .fr-icon-motorbike-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/motorbike-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/motorbike-fill.svg");
  }

  .fr-icon-motorbike-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/motorbike-line.svg");
    mask-image: url-asset("/icones/dsfr/map/motorbike-line.svg");
  }

  .fr-icon-passport-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/passport-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/passport-fill.svg");
  }

  .fr-icon-passport-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/passport-line.svg");
    mask-image: url-asset("/icones/dsfr/map/passport-line.svg");
  }

  .fr-icon-restaurant-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/restaurant-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/restaurant-fill.svg");
  }

  .fr-icon-restaurant-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/restaurant-line.svg");
    mask-image: url-asset("/icones/dsfr/map/restaurant-line.svg");
  }

  .fr-icon-road-map-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/road-map-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/road-map-fill.svg");
  }

  .fr-icon-road-map-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/road-map-line.svg");
    mask-image: url-asset("/icones/dsfr/map/road-map-line.svg");
  }

  .fr-icon-sailboat-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/sailboat-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/sailboat-fill.svg");
  }

  .fr-icon-sailboat-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/sailboat-line.svg");
    mask-image: url-asset("/icones/dsfr/map/sailboat-line.svg");
  }

  .fr-icon-ship-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/ship-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/ship-2-fill.svg");
  }

  .fr-icon-ship-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/ship-2-line.svg");
    mask-image: url-asset("/icones/dsfr/map/ship-2-line.svg");
  }

  .fr-icon-signal-tower-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/signal-tower-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/signal-tower-fill.svg");
  }

  .fr-icon-signal-tower-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/signal-tower-line.svg");
    mask-image: url-asset("/icones/dsfr/map/signal-tower-line.svg");
  }

  .fr-icon-suitcase-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/suitcase-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/suitcase-2-fill.svg");
  }

  .fr-icon-suitcase-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/suitcase-2-line.svg");
    mask-image: url-asset("/icones/dsfr/map/suitcase-2-line.svg");
  }

  .fr-icon-taxi-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/taxi-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/taxi-fill.svg");
  }

  .fr-icon-taxi-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/taxi-line.svg");
    mask-image: url-asset("/icones/dsfr/map/taxi-line.svg");
  }

  .fr-icon-train-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/train-fill.svg");
    mask-image: url-asset("/icones/dsfr/map/train-fill.svg");
  }

  .fr-icon-train-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/map/train-line.svg");
    mask-image: url-asset("/icones/dsfr/map/train-line.svg");
  }

  .fr-icon-camera-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/camera-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/camera-fill.svg");
  }

  .fr-icon-camera-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/camera-line.svg");
    mask-image: url-asset("/icones/dsfr/media/camera-line.svg");
  }

  .fr-icon-clapperboard-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/clapperboard-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/clapperboard-fill.svg");
  }

  .fr-icon-clapperboard-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/clapperboard-line.svg");
    mask-image: url-asset("/icones/dsfr/media/clapperboard-line.svg");
  }

  .fr-icon-equalizer-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/equalizer-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/equalizer-fill.svg");
  }

  .fr-icon-equalizer-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/equalizer-line.svg");
    mask-image: url-asset("/icones/dsfr/media/equalizer-line.svg");
  }

  .fr-icon-film-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/film-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/film-fill.svg");
  }

  .fr-icon-film-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/film-line.svg");
    mask-image: url-asset("/icones/dsfr/media/film-line.svg");
  }

  .fr-icon-fullscreen-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/fullscreen-line.svg");
    mask-image: url-asset("/icones/dsfr/media/fullscreen-line.svg");
  }

  .fr-icon-gallery-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/gallery-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/gallery-fill.svg");
  }

  .fr-icon-gallery-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/gallery-line.svg");
    mask-image: url-asset("/icones/dsfr/media/gallery-line.svg");
  }

  .fr-icon-headphone-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/headphone-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/headphone-fill.svg");
  }

  .fr-icon-headphone-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/headphone-line.svg");
    mask-image: url-asset("/icones/dsfr/media/headphone-line.svg");
  }

  .fr-icon-image-add-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/image-add-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/image-add-fill.svg");
  }

  .fr-icon-image-add-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/image-add-line.svg");
    mask-image: url-asset("/icones/dsfr/media/image-add-line.svg");
  }

  .fr-icon-image-edit-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/image-edit-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/image-edit-fill.svg");
  }

  .fr-icon-image-edit-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/image-edit-line.svg");
    mask-image: url-asset("/icones/dsfr/media/image-edit-line.svg");
  }

  .fr-icon-image-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/image-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/image-fill.svg");
  }

  .fr-icon-image-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/image-line.svg");
    mask-image: url-asset("/icones/dsfr/media/image-line.svg");
  }

  .fr-icon-live-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/live-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/live-fill.svg");
  }

  .fr-icon-live-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/live-line.svg");
    mask-image: url-asset("/icones/dsfr/media/live-line.svg");
  }

  .fr-icon-mic-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/mic-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/mic-fill.svg");
  }

  .fr-icon-mic-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/mic-line.svg");
    mask-image: url-asset("/icones/dsfr/media/mic-line.svg");
  }

  .fr-icon-music-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/music-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/music-2-fill.svg");
  }

  .fr-icon-music-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/music-2-line.svg");
    mask-image: url-asset("/icones/dsfr/media/music-2-line.svg");
  }

  .fr-icon-notification-3-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/notification-3-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/notification-3-fill.svg");
  }

  .fr-icon-notification-3-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/notification-3-line.svg");
    mask-image: url-asset("/icones/dsfr/media/notification-3-line.svg");
  }

  .fr-icon-pause-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/pause-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/pause-circle-fill.svg");
  }

  .fr-icon-pause-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/pause-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/media/pause-circle-line.svg");
  }

  .fr-icon-play-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/play-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/play-circle-fill.svg");
  }

  .fr-icon-play-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/play-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/media/play-circle-line.svg");
  }

  .fr-icon-stop-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/stop-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/stop-circle-fill.svg");
  }

  .fr-icon-stop-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/stop-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/media/stop-circle-line.svg");
  }

  .fr-icon-volume-down-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/volume-down-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/volume-down-fill.svg");
  }

  .fr-icon-volume-down-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/volume-down-line.svg");
    mask-image: url-asset("/icones/dsfr/media/volume-down-line.svg");
  }

  .fr-icon-volume-mute-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/volume-mute-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/volume-mute-fill.svg");
  }

  .fr-icon-volume-mute-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/volume-mute-line.svg");
    mask-image: url-asset("/icones/dsfr/media/volume-mute-line.svg");
  }

  .fr-icon-volume-up-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/volume-up-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/volume-up-fill.svg");
  }

  .fr-icon-volume-up-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/volume-up-line.svg");
    mask-image: url-asset("/icones/dsfr/media/volume-up-line.svg");
  }

  .fr-icon-play-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/play-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/media/play-circle-line.svg");
  }

  .fr-icon-play-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/media/play-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/media/play-circle-fill.svg");
  }

  .fr-icon-accessibility-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/fr--accessibility-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/fr--accessibility-fill.svg");
  }

  .fr-icon-accessibility-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/fr--accessibility-line.svg");
    mask-image: url-asset("/icones/dsfr/others/fr--accessibility-line.svg");
  }

  .fr-icon-ear-off-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/fr--ear-off-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/fr--ear-off-fill.svg");
  }

  .fr-icon-ear-off-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/fr--ear-off-line.svg");
    mask-image: url-asset("/icones/dsfr/others/fr--ear-off-line.svg");
  }

  .fr-icon-mental-disabilities-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/fr--mental-disabilities-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/fr--mental-disabilities-fill.svg");
  }

  .fr-icon-mental-disabilities-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/fr--mental-disabilities-line.svg");
    mask-image: url-asset("/icones/dsfr/others/fr--mental-disabilities-line.svg");
  }

  .fr-icon-sign-language-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/fr--sign-language-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/fr--sign-language-fill.svg");
  }

  .fr-icon-sign-language-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/fr--sign-language-line.svg");
    mask-image: url-asset("/icones/dsfr/others/fr--sign-language-line.svg");
  }

  .fr-icon-leaf-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/leaf-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/leaf-fill.svg");
  }

  .fr-icon-leaf-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/leaf-line.svg");
    mask-image: url-asset("/icones/dsfr/others/leaf-line.svg");
  }

  .fr-icon-lightbulb-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/lightbulb-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/lightbulb-fill.svg");
  }

  .fr-icon-lightbulb-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/lightbulb-line.svg");
    mask-image: url-asset("/icones/dsfr/others/lightbulb-line.svg");
  }

  .fr-icon-plant-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/plant-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/plant-fill.svg");
  }

  .fr-icon-plant-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/plant-line.svg");
    mask-image: url-asset("/icones/dsfr/others/plant-line.svg");
  }

  .fr-icon-recycle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/recycle-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/recycle-fill.svg");
  }

  .fr-icon-recycle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/recycle-line.svg");
    mask-image: url-asset("/icones/dsfr/others/recycle-line.svg");
  }

  .fr-icon-scales-3-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/scales-3-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/scales-3-fill.svg");
  }

  .fr-icon-scales-3-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/scales-3-line.svg");
    mask-image: url-asset("/icones/dsfr/others/scales-3-line.svg");
  }

  .fr-icon-seedling-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/seedling-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/seedling-fill.svg");
  }

  .fr-icon-seedling-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/seedling-line.svg");
    mask-image: url-asset("/icones/dsfr/others/seedling-line.svg");
  }

  .fr-icon-umbrella-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/umbrella-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/umbrella-fill.svg");
  }

  .fr-icon-umbrella-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/umbrella-line.svg");
    mask-image: url-asset("/icones/dsfr/others/umbrella-line.svg");
  }

  .fr-icon-wheelchair-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/wheelchair-fill.svg");
    mask-image: url-asset("/icones/dsfr/others/wheelchair-fill.svg");
  }

  .fr-icon-wheelchair-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/others/wheelchair-line.svg");
    mask-image: url-asset("/icones/dsfr/others/wheelchair-line.svg");
  }

  .fr-icon-add-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/add-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/add-circle-fill.svg");
  }

  .fr-icon-add-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/add-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/system/add-circle-line.svg");
  }

  .fr-icon-add-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/add-line.svg");
    mask-image: url-asset("/icones/dsfr/system/add-line.svg");
  }

  .fr-icon-alarm-warning-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/alarm-warning-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/alarm-warning-fill.svg");
  }

  .fr-icon-alarm-warning-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/alarm-warning-line.svg");
    mask-image: url-asset("/icones/dsfr/system/alarm-warning-line.svg");
  }

  .fr-icon-alert-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/alert-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/alert-fill.svg");
  }

  .fr-icon-alert-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/alert-line.svg");
    mask-image: url-asset("/icones/dsfr/system/alert-line.svg");
  }

  .fr-icon-arrow-down-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-down-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-down-fill.svg");
  }

  .fr-icon-arrow-down-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-down-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-down-line.svg");
  }

  .fr-icon-arrow-down-s-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-down-s-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-down-s-fill.svg");
  }

  .fr-icon-arrow-down-s-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-down-s-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-down-s-line.svg");
  }

  .fr-icon-arrow-go-back-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-go-back-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-go-back-fill.svg");
  }

  .fr-icon-arrow-go-back-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-go-back-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-go-back-line.svg");
  }

  .fr-icon-arrow-go-forward-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-go-forward-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-go-forward-fill.svg");
  }

  .fr-icon-arrow-go-forward-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-go-forward-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-go-forward-line.svg");
  }

  .fr-icon-arrow-left-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-left-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-left-fill.svg");
  }

  .fr-icon-arrow-left-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-left-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-left-line.svg");
  }

  .fr-icon-arrow-left-s-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-left-s-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-left-s-fill.svg");
  }

  .fr-icon-arrow-left-s-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-left-s-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-left-s-line.svg");
  }

  .fr-icon-arrow-right-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-right-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-right-fill.svg");
  }

  .fr-icon-arrow-right-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-right-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-right-line.svg");
  }

  .fr-icon-arrow-right-s-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-right-s-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-right-s-fill.svg");
  }

  .fr-icon-arrow-right-s-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-right-s-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-right-s-line.svg");
  }

  .fr-icon-arrow-right-up-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-right-up-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-right-up-line.svg");
  }

  .fr-icon-arrow-up-down-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-up-down-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-up-down-line.svg");
  }

  .fr-icon-arrow-up-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-up-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-up-fill.svg");
  }

  .fr-icon-arrow-up-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-up-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-up-line.svg");
  }

  .fr-icon-arrow-up-s-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-up-s-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-up-s-fill.svg");
  }

  .fr-icon-arrow-up-s-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/arrow-up-s-line.svg");
    mask-image: url-asset("/icones/dsfr/system/arrow-up-s-line.svg");
  }

  .fr-icon-check-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/check-line.svg");
    mask-image: url-asset("/icones/dsfr/system/check-line.svg");
  }

  .fr-icon-checkbox-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/checkbox-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/checkbox-circle-fill.svg");
  }

  .fr-icon-checkbox-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/checkbox-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/system/checkbox-circle-line.svg");
  }

  .fr-icon-checkbox-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/checkbox-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/checkbox-fill.svg");
  }

  .fr-icon-checkbox-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/checkbox-line.svg");
    mask-image: url-asset("/icones/dsfr/system/checkbox-line.svg");
  }

  .fr-icon-close-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/close-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/close-circle-fill.svg");
  }

  .fr-icon-close-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/close-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/system/close-circle-line.svg");
  }

  .fr-icon-close-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/close-line.svg");
    mask-image: url-asset("/icones/dsfr/system/close-line.svg");
  }

  .fr-icon-delete-bin-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/delete-bin-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/delete-bin-fill.svg");
  }

  .fr-icon-delete-bin-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/delete-bin-line.svg");
    mask-image: url-asset("/icones/dsfr/system/delete-bin-line.svg");
  }

  .fr-icon-download-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/download-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/download-fill.svg");
  }

  .fr-icon-download-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/download-line.svg");
    mask-image: url-asset("/icones/dsfr/system/download-line.svg");
  }

  .fr-icon-error-warning-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/error-warning-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/error-warning-fill.svg");
  }

  .fr-icon-error-warning-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/error-warning-line.svg");
    mask-image: url-asset("/icones/dsfr/system/error-warning-line.svg");
  }

  .fr-icon-external-link-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/external-link-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/external-link-fill.svg");
  }

  .fr-icon-external-link-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/external-link-line.svg");
    mask-image: url-asset("/icones/dsfr/system/external-link-line.svg");
  }

  .fr-icon-eye-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/eye-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/eye-fill.svg");
  }

  .fr-icon-eye-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/eye-line.svg");
    mask-image: url-asset("/icones/dsfr/system/eye-line.svg");
  }

  .fr-icon-eye-off-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/eye-off-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/eye-off-fill.svg");
  }

  .fr-icon-eye-off-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/eye-off-line.svg");
    mask-image: url-asset("/icones/dsfr/system/eye-off-line.svg");
  }

  .fr-icon-filter-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/filter-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/filter-fill.svg");
  }

  .fr-icon-filter-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/filter-line.svg");
    mask-image: url-asset("/icones/dsfr/system/filter-line.svg");
  }

  .fr-icon-alert-warning-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--alert-warning-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--alert-warning-2-fill.svg");
  }

  .fr-icon-alert-warning-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--alert-warning-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--alert-warning-fill.svg");
  }

  .fr-icon-arrow-left-s-first-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--arrow-left-s-first-line.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--arrow-left-s-first-line.svg");
  }

  .fr-icon-arrow-left-s-line-double:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--arrow-left-s-line-double.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--arrow-left-s-line-double.svg");
  }

  .fr-icon-arrow-right-down-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--arrow-right-down-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--arrow-right-down-circle-fill.svg");
  }

  .fr-icon-arrow-right-s-last-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--arrow-right-s-last-line.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--arrow-right-s-last-line.svg");
  }

  .fr-icon-arrow-right-s-line-double:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--arrow-right-s-line-double.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--arrow-right-s-line-double.svg");
  }

  .fr-icon-arrow-right-up-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--arrow-right-up-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--arrow-right-up-circle-fill.svg");
  }

  .fr-icon-capslock-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--capslock-line.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--capslock-line.svg");
  }

  .fr-icon-equal-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--equal-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--equal-circle-fill.svg");
  }

  .fr-icon-error-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--error-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--error-fill.svg");
  }

  .fr-icon-error-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--error-line.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--error-line.svg");
  }

  .fr-icon-info-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--info-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--info-fill.svg");
  }

  .fr-icon-info-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--info-line.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--info-line.svg");
  }

  .fr-icon-success-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--success-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--success-fill.svg");
  }

  .fr-icon-success-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--success-line.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--success-line.svg");
  }

  .fr-icon-theme-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--theme-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--theme-fill.svg");
  }

  .fr-icon-warning-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--warning-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--warning-fill.svg");
  }

  .fr-icon-warning-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/fr--warning-line.svg");
    mask-image: url-asset("/icones/dsfr/system/fr--warning-line.svg");
  }

  .fr-icon-information-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/information-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/information-fill.svg");
  }

  .fr-icon-information-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/information-line.svg");
    mask-image: url-asset("/icones/dsfr/system/information-line.svg");
  }

  .fr-icon-lock-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/lock-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/lock-fill.svg");
  }

  .fr-icon-lock-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/lock-line.svg");
    mask-image: url-asset("/icones/dsfr/system/lock-line.svg");
  }

  .fr-icon-lock-unlock-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/lock-unlock-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/lock-unlock-fill.svg");
  }

  .fr-icon-lock-unlock-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/lock-unlock-line.svg");
    mask-image: url-asset("/icones/dsfr/system/lock-unlock-line.svg");
  }

  .fr-icon-logout-box-r-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/logout-box-r-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/logout-box-r-fill.svg");
  }

  .fr-icon-logout-box-r-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/logout-box-r-line.svg");
    mask-image: url-asset("/icones/dsfr/system/logout-box-r-line.svg");
  }

  .fr-icon-menu-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/menu-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/menu-2-fill.svg");
  }

  .fr-icon-menu-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/menu-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/menu-fill.svg");
  }

  .fr-icon-more-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/more-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/more-fill.svg");
  }

  .fr-icon-more-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/more-line.svg");
    mask-image: url-asset("/icones/dsfr/system/more-line.svg");
  }

  .fr-icon-notification-badge-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/notification-badge-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/notification-badge-fill.svg");
  }

  .fr-icon-notification-badge-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/notification-badge-line.svg");
    mask-image: url-asset("/icones/dsfr/system/notification-badge-line.svg");
  }

  .fr-icon-question-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/question-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/question-fill.svg");
  }

  .fr-icon-question-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/question-line.svg");
    mask-image: url-asset("/icones/dsfr/system/question-line.svg");
  }

  .fr-icon-refresh-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/refresh-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/refresh-fill.svg");
  }

  .fr-icon-refresh-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/refresh-line.svg");
    mask-image: url-asset("/icones/dsfr/system/refresh-line.svg");
  }

  .fr-icon-search-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/search-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/search-fill.svg");
  }

  .fr-icon-search-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/search-line.svg");
    mask-image: url-asset("/icones/dsfr/system/search-line.svg");
  }

  .fr-icon-settings-5-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/settings-5-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/settings-5-fill.svg");
  }

  .fr-icon-settings-5-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/settings-5-line.svg");
    mask-image: url-asset("/icones/dsfr/system/settings-5-line.svg");
  }

  .fr-icon-share-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/share-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/share-fill.svg");
  }

  .fr-icon-share-forward-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/share-forward-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/share-forward-fill.svg");
  }

  .fr-icon-share-forward-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/share-forward-line.svg");
    mask-image: url-asset("/icones/dsfr/system/share-forward-line.svg");
  }

  .fr-icon-share-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/share-line.svg");
    mask-image: url-asset("/icones/dsfr/system/share-line.svg");
  }

  .fr-icon-shield-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/shield-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/shield-fill.svg");
  }

  .fr-icon-shield-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/shield-line.svg");
    mask-image: url-asset("/icones/dsfr/system/shield-line.svg");
  }

  .fr-icon-star-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/star-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/star-fill.svg");
  }

  .fr-icon-star-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/star-line.svg");
    mask-image: url-asset("/icones/dsfr/system/star-line.svg");
  }

  .fr-icon-star-s-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/star-s-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/star-s-fill.svg");
  }

  .fr-icon-star-s-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/star-s-line.svg");
    mask-image: url-asset("/icones/dsfr/system/star-s-line.svg");
  }

  .fr-icon-subtract-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/subtract-line.svg");
    mask-image: url-asset("/icones/dsfr/system/subtract-line.svg");
  }

  .fr-icon-thumb-down-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/thumb-down-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/thumb-down-fill.svg");
  }

  .fr-icon-thumb-down-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/thumb-down-line.svg");
    mask-image: url-asset("/icones/dsfr/system/thumb-down-line.svg");
  }

  .fr-icon-thumb-up-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/thumb-up-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/thumb-up-fill.svg");
  }

  .fr-icon-thumb-up-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/thumb-up-line.svg");
    mask-image: url-asset("/icones/dsfr/system/thumb-up-line.svg");
  }

  .fr-icon-time-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/time-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/time-fill.svg");
  }

  .fr-icon-time-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/time-line.svg");
    mask-image: url-asset("/icones/dsfr/system/time-line.svg");
  }

  .fr-icon-timer-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/timer-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/timer-fill.svg");
  }

  .fr-icon-timer-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/timer-line.svg");
    mask-image: url-asset("/icones/dsfr/system/timer-line.svg");
  }

  .fr-icon-upload-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/upload-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/upload-2-fill.svg");
  }

  .fr-icon-upload-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/upload-2-line.svg");
    mask-image: url-asset("/icones/dsfr/system/upload-2-line.svg");
  }

  .fr-icon-upload-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/upload-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/upload-fill.svg");
  }

  .fr-icon-upload-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/upload-line.svg");
    mask-image: url-asset("/icones/dsfr/system/upload-line.svg");
  }

  .fr-icon-zoom-in-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/zoom-in-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/zoom-in-fill.svg");
  }

  .fr-icon-zoom-in-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/zoom-in-line.svg");
    mask-image: url-asset("/icones/dsfr/system/zoom-in-line.svg");
  }

  .fr-icon-zoom-out-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/zoom-out-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/zoom-out-fill.svg");
  }

  .fr-icon-zoom-out-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/zoom-out-line.svg");
    mask-image: url-asset("/icones/dsfr/system/zoom-out-line.svg");
  }

  .fr-icon-delete-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/delete-bin-line.svg");
    mask-image: url-asset("/icones/dsfr/system/delete-bin-line.svg");
  }

  .fr-icon-delete-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/system/delete-bin-fill.svg");
    mask-image: url-asset("/icones/dsfr/system/delete-bin-fill.svg");
  }

  .fr-icon-account-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/account-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/account-circle-fill.svg");
  }

  .fr-icon-account-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/account-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/user/account-circle-line.svg");
  }

  .fr-icon-account-pin-circle-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/account-pin-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/account-pin-circle-fill.svg");
  }

  .fr-icon-account-pin-circle-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/account-pin-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/user/account-pin-circle-line.svg");
  }

  .fr-icon-admin-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/admin-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/admin-fill.svg");
  }

  .fr-icon-admin-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/admin-line.svg");
    mask-image: url-asset("/icones/dsfr/user/admin-line.svg");
  }

  .fr-icon-group-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/group-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/group-fill.svg");
  }

  .fr-icon-group-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/group-line.svg");
    mask-image: url-asset("/icones/dsfr/user/group-line.svg");
  }

  .fr-icon-parent-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/parent-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/parent-fill.svg");
  }

  .fr-icon-parent-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/parent-line.svg");
    mask-image: url-asset("/icones/dsfr/user/parent-line.svg");
  }

  .fr-icon-team-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/team-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/team-fill.svg");
  }

  .fr-icon-team-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/team-line.svg");
    mask-image: url-asset("/icones/dsfr/user/team-line.svg");
  }

  .fr-icon-user-add-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-add-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/user-add-fill.svg");
  }

  .fr-icon-user-add-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-add-line.svg");
    mask-image: url-asset("/icones/dsfr/user/user-add-line.svg");
  }

  .fr-icon-user-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/user-fill.svg");
  }

  .fr-icon-user-heart-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-heart-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/user-heart-fill.svg");
  }

  .fr-icon-user-heart-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-heart-line.svg");
    mask-image: url-asset("/icones/dsfr/user/user-heart-line.svg");
  }

  .fr-icon-user-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-line.svg");
    mask-image: url-asset("/icones/dsfr/user/user-line.svg");
  }

  .fr-icon-user-search-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-search-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/user-search-fill.svg");
  }

  .fr-icon-user-search-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-search-line.svg");
    mask-image: url-asset("/icones/dsfr/user/user-search-line.svg");
  }

  .fr-icon-user-setting-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-setting-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/user-setting-fill.svg");
  }

  .fr-icon-user-setting-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-setting-line.svg");
    mask-image: url-asset("/icones/dsfr/user/user-setting-line.svg");
  }

  .fr-icon-user-star-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-star-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/user-star-fill.svg");
  }

  .fr-icon-user-star-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/user-star-line.svg");
    mask-image: url-asset("/icones/dsfr/user/user-star-line.svg");
  }

  .fr-icon-account-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/account-circle-line.svg");
    mask-image: url-asset("/icones/dsfr/user/account-circle-line.svg");
  }

  .fr-icon-account-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/user/account-circle-fill.svg");
    mask-image: url-asset("/icones/dsfr/user/account-circle-fill.svg");
  }

  .fr-icon-cloudy-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/cloudy-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/cloudy-2-fill.svg");
  }

  .fr-icon-cloudy-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/cloudy-2-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/cloudy-2-line.svg");
  }

  .fr-icon-fire-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/fire-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/fire-fill.svg");
  }

  .fr-icon-fire-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/fire-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/fire-line.svg");
  }

  .fr-icon-flashlight-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/flashlight-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/flashlight-fill.svg");
  }

  .fr-icon-flashlight-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/flashlight-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/flashlight-line.svg");
  }

  .fr-icon-flood-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/flood-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/flood-fill.svg");
  }

  .fr-icon-flood-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/flood-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/flood-line.svg");
  }

  .fr-icon-avalanches-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/fr--avalanches-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/fr--avalanches-fill.svg");
  }

  .fr-icon-submersion-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/fr--submersion-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/fr--submersion-fill.svg");
  }

  .fr-icon-heavy-showers-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/heavy-showers-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/heavy-showers-fill.svg");
  }

  .fr-icon-heavy-showers-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/heavy-showers-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/heavy-showers-line.svg");
  }

  .fr-icon-moon-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/moon-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/moon-fill.svg");
  }

  .fr-icon-moon-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/moon-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/moon-line.svg");
  }

  .fr-icon-snowy-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/snowy-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/snowy-fill.svg");
  }

  .fr-icon-snowy-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/snowy-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/snowy-line.svg");
  }

  .fr-icon-sparkling-2-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/sparkling-2-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/sparkling-2-fill.svg");
  }

  .fr-icon-sparkling-2-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/sparkling-2-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/sparkling-2-line.svg");
  }

  .fr-icon-sun-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/sun-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/sun-fill.svg");
  }

  .fr-icon-sun-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/sun-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/sun-line.svg");
  }

  .fr-icon-temp-cold-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/temp-cold-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/temp-cold-fill.svg");
  }

  .fr-icon-temp-cold-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/temp-cold-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/temp-cold-line.svg");
  }

  .fr-icon-thunderstorms-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/thunderstorms-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/thunderstorms-fill.svg");
  }

  .fr-icon-thunderstorms-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/thunderstorms-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/thunderstorms-line.svg");
  }

  .fr-icon-tornado-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/tornado-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/tornado-fill.svg");
  }

  .fr-icon-tornado-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/tornado-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/tornado-line.svg");
  }

  .fr-icon-typhoon-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/typhoon-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/typhoon-fill.svg");
  }

  .fr-icon-typhoon-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/typhoon-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/typhoon-line.svg");
  }

  .fr-icon-windy-fill:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/windy-fill.svg");
    mask-image: url-asset("/icones/dsfr/weather/windy-fill.svg");
  }

  .fr-icon-windy-line:before {
    -webkit-mask-image: url-asset("/icones/dsfr/weather/windy-line.svg");
    mask-image: url-asset("/icones/dsfr/weather/windy-line.svg");
  }
</style>
