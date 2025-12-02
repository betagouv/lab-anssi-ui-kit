/**
 * Cette fonction configure les chemins d'importation, les données additionnelles
 * et les paramètres de compilation pour le préprocesseur SCSS de Vite.
 *
 * @param varEnv - Variables d'environnement selon le contexte d'exécution
 * @param varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE - URL de base pour les assets de l'UI Kit
 *
 * @returns Options de configuration pour le préprocesseur SCSS de Vite
 */
export default function viteScssPreprocessorOptions(varEnv: Record<string, string>) {
  return {
    additionalData: `
          @use 'src/variables.scss' as *;
          @use 'src/responsive.scss' as *;
          @use 'src/assets.scss' as *;
          @use 'src/lib/styles/mixins.scss' as *;
          $assets-url-base: '${varEnv.VITE_LAB_ANSSI_UI_KIT_ASSET_BASE}';
        `,
    loadPaths: ["node_modules/@gouvfr/dsfr", "node_modules/@gouvfr/dsfr/src"],
    quietDeps: true,
  };
}
