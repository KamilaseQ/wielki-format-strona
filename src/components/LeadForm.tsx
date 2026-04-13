"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, AlertCircle, Star, Shield, Clock } from "lucide-react";

interface FieldState {
  value: string;
  touched: boolean;
  valid: boolean;
}

function useField(validator?: (v: string) => boolean) {
  const [state, setState] = useState<FieldState>({ value: "", touched: false, valid: false });
  const onChange = (v: string) => setState({ value: v, touched: true, valid: validator ? validator(v) : v.length > 0 });
  const onBlur = () => setState((s) => ({ ...s, touched: true }));
  return { ...state, onChange, onBlur };
}

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const name = useField((v) => v.trim().length >= 2);
  const email = useField((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const phone = useField(); // Optional
  const city = useField(); // Optional
  const [message, setMessage] = useState("");

  const isValid = name.valid && email.valid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl bg-surface-elevated border border-primary/20 p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
          className="w-14 h-14 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-5"
        >
          <CheckCircle className="w-7 h-7 text-primary" />
        </motion.div>
        <h3 className="font-heading font-bold text-xl text-foreground mb-2">Dziękujemy!</h3>
        <p className="text-sm text-muted-foreground mb-1">Twoje zapytanie zostało wysłane.</p>
        <p className="text-sm text-muted-foreground">Twój opiekun kampanii skontaktuje się w ciągu <span className="text-foreground font-semibold">24 godzin</span>.</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl bg-surface-elevated border border-border p-6 ${compact ? "" : "md:p-8"}`}
      noValidate
    >
      {!compact && (
        <div className="mb-6">
          <h3 className="font-heading font-bold text-xl text-foreground mb-1">Otrzymaj wycenę w 24h</h3>
          <p className="text-sm text-muted-foreground">Bez zobowiązań. Odpowiadamy na każde zapytanie.</p>
        </div>
      )}
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
        <FormField
          type="text"
          placeholder="Imię i nazwisko *"
          required
          value={name.value}
          onChange={name.onChange}
          onBlur={name.onBlur}
          touched={name.touched}
          valid={name.valid}
          error="Podaj imię i nazwisko"
        />
        <FormField
          type="email"
          placeholder="Adres e-mail *"
          required
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          touched={email.touched}
          valid={email.valid}
          error="Podaj prawidłowy adres e-mail"
        />
        <FormField
          type="tel"
          placeholder="Numer telefonu"
          value={phone.value}
          onChange={phone.onChange}
          onBlur={phone.onBlur}
          touched={phone.touched}
          valid={true}
        />
        <FormField
          type="text"
          placeholder="Miasto / region"
          value={city.value}
          onChange={city.onChange}
          onBlur={city.onBlur}
          touched={city.touched}
          valid={true}
        />
      </div>
      <textarea
        placeholder="Opisz krótko swoje potrzeby..."
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full mt-4 px-4 py-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
      />
      <Button
        type="submit"
        variant="cta"
        size="lg"
        className="w-full mt-4"
        disabled={!isValid || submitting}
      >
        {submitting ? (
          <motion.span
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            />
            Wysyłanie...
          </motion.span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Chcę otrzymać wycenę
          </>
        )}
      </Button>

      {/* Social proof */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground/40">
        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Dane bezpieczne</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Odpowiedź w 24h</span>
        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400/50" /> 4.9/5</span>
      </div>
    </form>
  );
}

function FormField({
  type, placeholder, required, value, onChange, onBlur, touched, valid, error,
}: {
  type: string; placeholder: string; required?: boolean;
  value: string; onChange: (v: string) => void; onBlur: () => void;
  touched: boolean; valid: boolean; error?: string;
}) {
  const showError = touched && !valid && value.length > 0 && error;
  const showValid = touched && valid && value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full h-11 px-4 pr-10 rounded-lg bg-input border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
          showError
            ? "border-red-400/50 focus:ring-red-400/30"
            : showValid
            ? "border-emerald-400/30 focus:ring-emerald-400/20"
            : "border-border focus:ring-primary/50 focus:border-primary/50"
        }`}
        aria-invalid={showError ? "true" : undefined}
      />
      {/* Validation icon */}
      <AnimatePresence>
        {showValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Error message */}
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-[11px] text-red-400 mt-1 pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
