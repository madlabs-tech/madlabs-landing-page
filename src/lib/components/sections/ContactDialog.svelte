<!--
	"Book a call" form. It has no backend: submitting composes a pre-filled email
	to SITE.email and hands it to the visitor's mail app.
-->
<script lang="ts">
	import { Send } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { Tag } from '@hryer/madlabs-design-system/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Dialog from '#lib/components/ui/Dialog.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import Toast from '#lib/components/ui/Toast.svelte';
	import { CONTACT_FORM as F, SITE } from '#lib/constants/site.ts';
	import { contact } from '#lib/hooks/contact.svelte.ts';
	import { ms } from '#lib/hooks/motion.ts';

	let name = $state('');
	let company = $state('');
	let topic = $state(F.topic.options[0]);
	let budget = $state(F.budget.options[1]);
	let message = $state('');
	let nameError = $state('');
	let toast = $state(false);
	let toastTimer: ReturnType<typeof setTimeout>;

	function submit(e: SubmitEvent) {
		e.preventDefault();
		name = name.trim();
		nameError = name ? '' : F.name.error;
		if (nameError) {
			document.getElementById('contact-name')?.focus();
			return;
		}
		const body = F.body({ name, company: company.trim(), topic, budget, message: message.trim() });
		location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(F.subject(topic, name))}&body=${encodeURIComponent(body)}`;
		contact.open = false;
		toast = true;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toast = false), 7000);
	}
</script>

<Dialog bind:open={contact.open} title={F.title} closeLabel={F.close} size="lg">
	<form id="contact-form" class="form" novalidate onsubmit={submit}>
		<p class="intro">{F.intro}</p>
		<div class="row">
			<Input
				id="contact-name"
				label={F.name.label}
				placeholder={F.name.placeholder}
				autocomplete="name"
				required
				bind:value={name}
				error={nameError}
			/>
			<Input label={F.company.label} placeholder={F.company.placeholder} autocomplete="organization" bind:value={company} />
		</div>
		<fieldset>
			<legend class="ml-field__label">{F.topic.label}</legend>
			<div class="chips">
				{#each F.topic.options as option (option)}
					<Tag selected={topic === option} onclick={() => (topic = option)}>{option}</Tag>
				{/each}
			</div>
		</fieldset>
		<Select label={F.budget.label} options={F.budget.options} bind:value={budget} />
		<Input label={F.message.label} placeholder={F.message.placeholder} multiline bind:value={message} />
		<p class="note">{F.note}</p>
	</form>

	{#snippet footer()}
		<Button variant="secondary" type="button" onclick={() => (contact.open = false)}>{F.cancel}</Button>
		<Button type="submit" form="contact-form" iconRight={Send}>{F.submit}</Button>
	{/snippet}
</Dialog>

{#if toast}
	<div class="toast" transition:fly={{ x: 24, duration: ms(300) }}>
		<Toast tone="success" title={F.toast.title} description={F.toast.description} dismissLabel={F.toast.dismiss} onclose={() => (toast = false)} />
	</div>
{/if}

<style>
	.form {
		display: grid;
		gap: var(--space-4);
	}
	.intro {
		margin: 0 0 var(--space-1);
	}
	.row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
		gap: 14px;
	}
	fieldset {
		margin: 0;
		padding: 0;
		border: 0;
		min-width: 0;
	}
	legend {
		margin-bottom: var(--space-2);
		padding: 0;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}
	.note {
		margin: 0;
		font-size: var(--size-sm);
		color: var(--fg-3);
	}
	.toast {
		position: fixed;
		right: var(--space-6);
		bottom: var(--space-6);
		left: auto;
		z-index: var(--z-toast);
		max-width: calc(100% - 2 * var(--space-4));
	}
	@media (max-width: 640px) {
		.toast {
			right: var(--space-4);
			bottom: var(--space-4);
		}
	}
</style>
