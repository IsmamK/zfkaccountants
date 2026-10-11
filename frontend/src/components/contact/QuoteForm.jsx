"use client";

import { useState } from "react";
import { FaArrowRight, FaLock } from "react-icons/fa";

import { useCms } from "@/components/cms/useCms";
import { submitForm } from "@/lib/forms";
import quoteFormDefinition from "@/data/quote-form.json";

/* =========================================
   Booking form (free consultation; stored as the "quote" form)
   Definition: home/form-quote/ (admin-editable,
   no code change to add/remove a field).
   Submit:     POST forms/quote/submit/
   The server validates against the same
   definition; its {errors} are authoritative.
========================================= */

export const FORM_NAME = "quote";

// Built-in definition; also what `npm run cms:seed` stores in the CMS.
export const DEFAULT_QUOTE_FORM = quoteFormDefinition;

const FIELD_HINTS = {
    "fields[].type": {
        type: "select",
        options: ["text", "textarea", "email", "tel", "url", "number", "date", "time", "datetime", "select", "multiselect", "radio", "checkbox", "checkboxes", "consent_marketing", "file", "hidden", "rating", "range"],
    },
    "fields[].width": { type: "select", options: ["half", "full"] },
    "fields[].name": { label: "Field key (letters, numbers, _)" },
    "fields[].options": { label: "Options (select / radio / checkboxes)" },
    honeypotField: { label: "Honeypot field name (spam trap)" },
};

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function emptyValue(field) {
    if (field.type === "checkbox" || field.type === "consent_marketing") return false;
    if (field.type === "multiselect" || field.type === "checkboxes") return [];
    return field.default ?? "";
}

function optionList(field) {
    return (field.options || []).map((opt) =>
        typeof opt === "object" ? { value: String(opt.value ?? opt.label), label: String(opt.label ?? opt.value) } : { value: String(opt), label: String(opt) }
    );
}

function clientErrors(definition, values) {
    const errors = {};
    for (const field of definition.fields || []) {
        // Marketing opt-in is never required and never pre-ticked (R33).
        if (field.type === "hidden" || field.type === "consent_marketing") continue;
        const value = values[field.name];
        const present = Array.isArray(value) ? value.length > 0 : value !== "" && value !== false && value !== undefined && value !== null;
        if (field.required && !present) {
            errors[field.name] = `${field.label || field.name} is required.`;
        } else if (present && field.type === "email" && !EMAIL.test(String(value))) {
            errors[field.name] = `${field.label || field.name} must be a valid email address.`;
        }
    }
    if (definition.consent?.required && !values.consent) {
        errors.consent = definition.consent.text || "Consent is required.";
    }
    return errors;
}

const STYLES = {
    desktop: {
        grid: "mt-5 grid grid-cols-2 gap-3",
        input: "h-11 w-full rounded-xl border border-[#DCE6F2] px-4 text-sm text-[#123A5C] outline-none placeholder:text-[#94A3B8] focus:border-[#0F9E86]",
        textarea: "h-16 w-full resize-none rounded-xl border border-[#DCE6F2] px-4 py-3 text-sm text-[#123A5C] outline-none placeholder:text-[#94A3B8] focus:border-[#0F9E86]",
        textareaWrap: "mt-3",
        button: "mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#FF6B4A] font-semibold text-white transition hover:opacity-90 disabled:opacity-60",
        arrow: "",
        note: "mt-3 flex items-center justify-center gap-2 text-xs text-[#64748B]",
        half: "",
        full: "col-span-2",
    },
    mobile: {
        grid: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
        input: "h-11 w-full rounded-xl border border-[#DCE6F2] bg-white px-4 text-sm text-[#123A5C] outline-none placeholder:text-[#94A3B8] focus:border-[#0F9E86]",
        textarea: "h-[76px] w-full resize-none rounded-xl border border-[#DCE6F2] bg-white px-4 py-3 text-sm text-[#123A5C] outline-none placeholder:text-[#94A3B8] focus:border-[#0F9E86] sm:h-[82px]",
        textareaWrap: "mt-3",
        button: "mt-3 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#FF6B4A] text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 sm:h-[50px] sm:text-base",
        arrow: "text-base sm:text-lg",
        note: "mt-3 flex items-center justify-center gap-2 text-center text-[11px] leading-4 text-[#64748B] sm:text-xs",
        half: "",
        full: "sm:col-span-2",
    },
};

// Date/time pickers ignore placeholders, so the field shows its label as text
// until it is focused or filled, then becomes the native picker. Dates start
// from today (a booking can't be in the past).
function PickerInput({ common, field, placeholder, value, onChange, className }) {
    const [active, setActive] = useState(false);
    const type = { datetime: "datetime-local" }[field.type] || field.type;
    const min = field.type === "date" ? new Date().toISOString().slice(0, 10) : undefined;
    return (
        <input
            {...common}
            type={active || value ? type : "text"}
            min={min}
            placeholder={placeholder}
            value={value}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={(e) => onChange(e.target.value)}
            className={className}
        />
    );
}

function Field({ field, value, error, onChange, styles, idPrefix }) {
    const id = `${idPrefix}-${field.name}`;
    const errorId = error ? `${id}-error` : undefined;
    const invalid = error ? "border-[#E5484D] focus:border-[#E5484D]" : "";
    const common = {
        id,
        name: field.name,
        "aria-label": field.label || field.placeholder || field.name,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": errorId,
    };
    const placeholder = field.placeholder || `${field.label || field.name}${field.required ? " *" : ""}`;
    const options = optionList(field);

    let control;
    switch (field.type) {
        case "textarea":
            control = <textarea {...common} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`${styles.textarea} ${invalid}`} />;
            break;
        case "select":
            control = (
                <select {...common} value={value} onChange={(e) => onChange(e.target.value)} className={`${styles.input} ${invalid} ${value ? "" : "text-[#94A3B8]"}`}>
                    <option value="">{placeholder}</option>
                    {options.map((o, index) => <option key={index} value={o.value}>{o.label}</option>)}
                </select>
            );
            break;
        case "multiselect":
            control = (
                <select {...common} multiple value={value} onChange={(e) => onChange(Array.from(e.target.selectedOptions, (o) => o.value))} className={`${styles.input} h-auto min-h-[88px] py-2 ${invalid}`}>
                    {options.map((o, index) => <option key={index} value={o.value}>{o.label}</option>)}
                </select>
            );
            break;
        case "radio":
        case "checkboxes":
            control = (
                <fieldset aria-describedby={errorId} className="rounded-xl border border-[#DCE6F2] px-4 py-3 text-sm text-[#123A5C]">
                    <legend className="px-1 text-xs font-semibold text-[#64748B]">{field.label}{field.required ? " *" : ""}</legend>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {options.map((o, index) => {
                            const checked = field.type === "radio" ? value === o.value : value.includes(o.value);
                            return (
                                <label key={index} className="flex items-center gap-2">
                                    <input
                                        type={field.type === "radio" ? "radio" : "checkbox"}
                                        name={field.name}
                                        value={o.value}
                                        checked={checked}
                                        onChange={() =>
                                            onChange(field.type === "radio" ? o.value : checked ? value.filter((v) => v !== o.value) : [...value, o.value])
                                        }
                                    />
                                    {o.label}
                                </label>
                            );
                        })}
                    </div>
                </fieldset>
            );
            break;
        case "consent_marketing":
            control = (
                <label className="flex items-start gap-2 text-sm text-[#475569]">
                    <input {...common} type="checkbox" checked={value === true} data-cms-field="consent_marketing" onChange={(e) => onChange(e.target.checked)} className="mt-1" />
                    <span>{field.label}</span>
                </label>
            );
            break;
        case "checkbox":
            control = (
                <label className="flex items-start gap-2 text-sm text-[#475569]">
                    <input {...common} type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="mt-1" />
                    <span>{field.label}{field.required ? " *" : ""}</span>
                </label>
            );
            break;
        case "rating":
            control = (
                <div className="flex items-center gap-1" role="radiogroup" aria-label={field.label}>
                    {[1, 2, 3, 4, 5].map((n, index) => (
                        <button key={index} type="button" role="radio" aria-checked={Number(value) === n} onClick={() => onChange(n)} className={`text-2xl ${Number(value) >= n ? "text-[#FF6B4A]" : "text-[#CBD5E1]"}`}>
                            ★
                        </button>
                    ))}
                </div>
            );
            break;
        case "range": {
            const v = field.validation || {};
            control = (
                <label className="block text-sm text-[#475569]">
                    {field.label}: <strong>{value || v.min || 0}</strong>
                    <input {...common} type="range" min={v.min ?? 0} max={v.max ?? 100} step={v.step ?? 1} value={value || v.min || 0} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[#0F9E86]" />
                </label>
            );
            break;
        }
        case "file":
            control = (
                <input {...common} type="file" onChange={(e) => onChange(e.target.files?.[0]?.name || "")} className={`${styles.input} py-2 file:mr-3 file:rounded-md file:border-0 file:bg-[#E2E8F0] file:px-3 file:py-1`} />
            );
            break;
        case "hidden":
            return <input type="hidden" name={field.name} value={value} />;
        case "date":
        case "time":
        case "datetime":
            control = <PickerInput common={common} field={field} placeholder={placeholder} value={value} onChange={onChange} className={`${styles.input} ${invalid}`} />;
            break;
        default: {
            const type = field.type || "text";
            control = <input {...common} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`${styles.input} ${invalid}`} />;
        }
    }

    return (
        <div className={field.width === "full" || field.type === "textarea" ? styles.full : styles.half}>
            {control}
            {field.help ? <p className="mt-1 text-[11px] text-[#64748B]">{field.help}</p> : null}
            {error ? <p id={errorId} className="mt-1 text-[12px] text-[#D92D20]">{error}</p> : null}
        </div>
    );
}

export default function QuoteForm({ variant = "desktop" }) {
    const { data: definition, E, editButton, hidden } = useCms(`form-${FORM_NAME}`, DEFAULT_QUOTE_FORM, {
        label: "Booking form",
        excludeFromKeywordAudit: true,
        fields: FIELD_HINTS,
    });
    const styles = STYLES[variant];
    const fields = definition.fields || [];
    const honeypot = definition.honeypotField || "website";

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ state: "idle", message: "" });

    const valueOf = (field) => values[field.name] ?? emptyValue(field);
    const setValue = (name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    async function onSubmit(event) {
        event.preventDefault();

        const payload = {};
        for (const field of fields) payload[field.name] = valueOf(field);
        if (definition.consent?.required || values.consent) payload.consent = !!values.consent;
        payload[honeypot] = new FormData(event.currentTarget).get(honeypot) || "";

        const found = clientErrors(definition, payload);
        if (Object.keys(found).length) {
            setErrors(found);
            setStatus({ state: "error", message: definition.errorMessage });
            return;
        }

        setStatus({ state: "sending", message: "" });
        // Stores the lead in the CMS, then emails it (FormSubmit) and fires
        // the generate_lead event — see lib/forms.js.
        const result = await submitForm(FORM_NAME, payload, { honeypotField: honeypot });
        if (!result.ok) {
            setErrors(result.errors);
            const message = result.status === 429
                ? "Too many requests — please wait a minute and try again."
                : result.status === 0
                    ? "We couldn't send your request. Please try again shortly."
                    : definition.errorMessage;
            setStatus({ state: "error", message });
            return;
        }
        setValues({});
        setErrors({});
        setStatus({ state: "done", message: definition.successMessage });
    }

    const shortFields = fields.filter((f) => f.type !== "textarea" && f.type !== "hidden");
    const longFields = fields.filter((f) => f.type === "textarea");
    const hiddenFields = fields.filter((f) => f.type === "hidden");
    const idPrefix = `quote-${variant}`;

    if (status.state === "done") {
        return (
            <div className="relative">
                {editButton}
                <div role="status" className="mt-5 rounded-2xl bg-[#ECFDF3] px-5 py-6 text-center text-sm leading-6 text-[#067647]">
                    <p className="text-base font-semibold"><E.Text path="successTitle" /></p>
                    <p className="mt-1"><E.Text path="successMessage" multiline /></p>
                </div>
                <button type="button" onClick={() => setStatus({ state: "idle", message: "" })} className="mt-3 w-full text-center text-xs font-semibold text-[#0F9E86] hover:underline">
                    <E.Text path="resetText" />
                </button>
            </div>
        );
    }

    // Hidden by an admin: nothing is rendered for visitors.
    if (hidden) return null;

    return (
        <form onSubmit={onSubmit} noValidate className="relative" aria-label="Book a free consultation" data-cms-form={FORM_NAME}>
            {editButton}

            <div className={styles.grid}>
                {shortFields.map((field, index) => (
                    <Field key={index} field={field} value={valueOf(field)} error={errors[field.name]} onChange={(v) => setValue(field.name, v)} styles={styles} idPrefix={idPrefix} />
                ))}
            </div>

            {longFields.map((field, index) => (
                <div key={index} className={styles.textareaWrap}>
                    <Field field={{ ...field, width: "full" }} value={valueOf(field)} error={errors[field.name]} onChange={(v) => setValue(field.name, v)} styles={{ ...styles, full: "" }} idPrefix={idPrefix} />
                </div>
            ))}

            {hiddenFields.map((field, index) => (
                <input key={index} type="hidden" name={field.name} value={valueOf(field)} />
            ))}

            {/* Spam trap: real visitors never see or fill this. */}
            <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
                <label>
                    Leave this empty {/* cms-static: hidden spam-trap label */}
                    <input type="text" name={honeypot} tabIndex={-1} autoComplete="off" />
                </label>
            </div>

            {definition.consent?.required ? (
                <label className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#475569]">
                    <input type="checkbox" checked={!!values.consent} onChange={(e) => setValue("consent", e.target.checked)} className="mt-0.5" />
                    <span>{definition.consent.text}</span>
                </label>
            ) : null}
            {errors.consent ? <p className="mt-1 text-[12px] text-[#D92D20]">{errors.consent}</p> : null}

            <button type="submit" disabled={status.state === "sending"} className={styles.button}>
                {status.state === "sending" ? "Sending…" : definition.submitText}
                <FaArrowRight className={styles.arrow} />
            </button>

            {status.state === "error" && status.message ? (
                <p role="alert" className="mt-2 text-center text-[12px] text-[#D92D20]">{status.message}</p>
            ) : null}

            <div className={styles.note}>
                <FaLock className="shrink-0" />
                <span>{definition.privacyNote}</span>
            </div>
        </form>
    );
}
