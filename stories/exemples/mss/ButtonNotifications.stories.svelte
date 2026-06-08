<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  const { Story } = defineMeta({
    title: "Exemples/LAB - MSS",
    component: DsfrButton,
    args: {
      label: "Notifications",
      kind: "tertiary-no-outline",
      hasIcon: true,
      icon: "notification-3-line",
      size: "sm",
    },
    tags: ["!autodocs"],
  });

  type Args = ComponentProps<DsfrButton>;
</script>

<Story name="Bouton notification">
  {#snippet template(args: Args)}
    <dsfr-button
      label={args.label}
      kind={args.kind}
      size={args.size}
      id={args.id}
      title={args.title}
      disabled={args.disabled || undefined}
      has-icon={args.hasIcon || undefined}
      icon={args.icon}
      icon-place={args.iconPlace}
      markup={args.markup}
      type={args.type}
      href={args.href}
      target={args.target}
      centered={args.centered || undefined}
      expandable={args.expandable || undefined}
      preset={args.preset}
      class="notification-button"
    >
      Notifications

      <span class="notification-button__indicateur" aria-hidden="true">1</span>
    </dsfr-button>

    <style>
      .notification-button {
        position: relative;
      }

      .notification-button__indicateur {
        background-color: var(--artwork-minor-red-marianne);
        border-radius: 50%;
        width: 12px;
        height: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--text-inverted-grey);
        font-size: 8px;
        position: absolute;
        left: 16px;
        top: 4px;
      }
    </style>
  {/snippet}
</Story>
