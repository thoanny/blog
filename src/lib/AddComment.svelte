<script lang="ts">
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
    import { PUBLIC_GRAPHQL_URL } from '$env/static/public';

    export let postId;

    let commentError = [];
    let commentSuccess = false;
    let lockedComment = false;

    async function addComment(data, pid) {

      if(data.subject) {
        commentSuccess = true;
        return;
      }

      const query = `
        mutation CREATE_COMMENT($author: String, $authorEmail: String, $commentOn: Int, $content: String) {
          createComment(
            input: {commentOn: $commentOn, content: $content, author: $author, authorEmail: $authorEmail}
          ) {
            success
            comment {
              date
              content
              author {
                node {
                  avatar {
                    url
                  }
                  name
                }
              }
            }
          }
        }
      `;

      commentError = [];

      const response = await fetch(PUBLIC_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            query: query,
            variables: {
              'author': data.name,
              'authorEmail': data.email,
              'commentOn': pid,
              'content': data.content              
            }
        }),
      });

      if (response.ok) {
        const res = await response.json();
        lockedComment = false;
        
        if(!res.data.createComment) {
          commentError = res.errors;
          return;
        }

        commentSuccess = true;
        return;
      }
    }

    const { form, errors, state, handleChange, handleSubmit } = createForm({
        initialValues: {
            name: "",
            email: "",
            content: "",
            save: false,
            privacy: false,
            subject: "",
        },
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email(),
            content: yup.string().required(),
            save: yup.bool(),
            privacy: yup.bool().required(),
            subject: yup.string()
        }),
            onSubmit: values => {
              lockedComment = true;
              addComment(values, postId);
        }
    });
</script>

<div>
  {#if commentSuccess}
    <div class="alert alert-success bg-primary shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Commentaire enregistré et en attente de validation.</span>
      </div>
    </div>
  {:else}
    <form class="shadow-xl rounded-xl p-4 border {(commentSuccess)?'hidden':''}" on:submit={handleSubmit} autocomplete="off">
      <h2 class="text-2xl mb-2 font-semibold">Ajouter un commentaire</h2>
      {#if commentError.length > 0}
        <div class="alert alert-error shadow-lg !mt-4 !mb-2">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              {#each commentError as error}
                <p>{error.message}</p>
              {/each}
            </div>
          </div>
        </div>
        
      {/if}
      <div class="flex gap-4">
        <div class="form-control w-full">
          <label class="label required" for="name">
            <span class="label-text">Pseudonyme</span>
          </label>
          <input 
              type="text" 
              placeholder="John Doe" 
              id="name"
              name="name"
              class="input input-bordered w-full" 
              on:change={handleChange}
              on:blur={handleChange}
              bind:value={$form.name} 
          />
          {#if $errors.name}
              <span class="label">
                  <span class="label-text-alt text-error">{$errors.name}</span>
              </span>
          {/if}
        </div>
        <div class="form-control w-full">
          <label class="label" for="email">
            <span class="label-text">Adresse e-mail</span>
          </label>
          <input 
              type="text" 
              placeholder="john.doe@fai.ext" 
              id="email"
              name="email"
              class="input input-bordered w-full" 
              on:change={handleChange}
              on:blur={handleChange}
              bind:value={$form.email} 
          />
          {#if $errors.email}
              <span class="label">
                  <span class="label-text-alt text-error">{$errors.email}</span>
              </span>
          {/if}
        </div>
      </div>
      <div class="form-control">
          <label class="label required" for="content">
              <span class="label-text">Commentaire</span>
          </label> 
          <textarea 
              class="textarea textarea-bordered h-36"
              id="content" 
              name="content" 
              placeholder=""
              on:change={handleChange}
              on:blur={handleChange}
              bind:value={$form.content} 
          ></textarea>
          {#if $errors.content}
              <span class="label">
                  <span class="label-text-alt text-error">{$errors.content}</span>
              </span>
          {/if}
      </div>
      <div class="form-control mt-1">
        <label class="label cursor-pointer justify-start gap-2">
          <input type="checkbox" class="toggle toggle-primary" name="save" on:change={handleChange} on:blur={handleChange} bind:value={$form.save} />
          <span class="label-text">Enregistrer mon pseudonyme et adresse e-mail</span>
          <div class="tooltip" data-tip="Ton pseudonyme et ton adresse e-mail sont enregistrés dans ton navigateur pour plus tard.">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
            </svg>              
          </div>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-2">
          <input type="checkbox" class="toggle toggle-primary" required />
          <span class="label-text">J'accepte la politique de confidentialité</span>
        </label>
      </div>

      <input type="hidden" name="subject" id="subject" on:change={handleChange} on:blur={handleChange} bind:value={$form.subject}>
      
      <button type="submit" disabled={lockedComment} class="btn btn-block mt-2 {(lockedComment)?'loading btn-disabled':'btn-primary'}">
        {#if lockedComment}Merci de patienter...{:else}Envoyer mon commentaire{/if}
      </button>
    </form>
  {/if}
</div>

<style lang="scss">
  form, .alert {
        @apply max-w-2xl mx-auto my-8;
  }

  form {
      input, textarea {
          @apply text-sm;
      }

      .label {
        &.required {
          .label-text {
            &:after {
              @apply text-error;
              content: '*';
            }
          }
        }
      }
  }
</style>