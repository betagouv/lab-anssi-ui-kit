<script lang="ts">
  type Service = {
    nom: string;
    lien: string;
    icone: string;
    labels?: string[];
  };

  export let titre: string;
  export let services: Service[];
</script>

<div class="bloc">
  <div class="titre">{titre}</div>
  <div class="conteneur">
    {#each services as { nom, lien, icone, labels }, i}
      <a href={lien} target="_blank">
        <div class="defaut">
          <div class="icone">
            <img src={icone} alt={nom} />
          </div>
          <div>{nom}</div>
        </div>
        {#if labels}
          <div class="labels">
            {#each labels as label}
              <span>{label}</span>
            {/each}
          </div>
        {/if}
      </a>
      {#if i < services.length - 1}
        <hr />
      {/if}
    {/each}
  </div>
</div>

<style lang="scss">
  .bloc {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    padding-bottom: 8px;
    gap: 10px;

    &:last-child {
      padding-bottom: 0;
    }
    .titre {
      display: flex;
      align-self: stretch;
      color: #666;
      font-size: 12px;
      font-weight: 700;
      line-height: 20px;
      text-transform: uppercase;
    }

    .conteneur {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      border-radius: 4px;
      border: 1px solid #ddd;
      background: #fff;
      a {
        text-decoration: none;

        &:hover {
          background-color: #f6f6f6;
        }
        &:active {
          background-color: #ededed;
        }

        .defaut {
          display: flex;
          padding: 12px;
          align-items: center;
          gap: 12px;
          flex: 1 0 0;
          color: #161616;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;

          .icone {
            display: flex;
            align-items: center;
          }
        }
        .labels {
          display: flex;
          align-items: flex-start;
          align-content: flex-start;
          gap: 8px;
          align-self: stretch;
          flex-wrap: wrap;
          margin-left: 56px;

          &:last-child {
            margin-bottom: 12px;
          }
          span {
            padding: 2px 8px;
            border-radius: 12px;
            background: #eee;
            color: #161616;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
          }
        }
      }
      hr {
        border: 0;
        border-top: 1px solid #ddd;
        margin: 0 16px;
      }
    }
  }
</style>
