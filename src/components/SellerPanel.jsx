import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../lib/routes';
import { formatDateRange, formatReservationStatus } from '../utils/format';

const clone = (value) => JSON.parse(JSON.stringify(value));

const tabs = [
  { key: 'overview', label: 'Visão geral' },
  { key: 'brand', label: 'Marca' },
  { key: 'stays', label: 'Hospedagem' },
  { key: 'gallery', label: 'Galeria' },
  { key: 'reservations', label: 'Reservas' },
  { key: 'config', label: 'Configuração' },
];

export function SellerPanel({ content, route, sellerAuthed, onLogin, onLogout, onPersistContent, onResetDemo, metrics, notice }) {
  const [code, setCode] = useState('');
  const [draft, setDraft] = useState(() => clone(content));

  useEffect(() => {
    setDraft(clone(content));
  }, [content]);

  const currentTab = useMemo(() => {
    return tabs.some((item) => item.key === route.tab) ? route.tab : 'overview';
  }, [route.tab]);

  const saveDraft = (message) => {
    onPersistContent(clone(draft), message);
  };

  if (!sellerAuthed) {
    return (
      <div className="min-h-screen bg-[#061317] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
          <div className="grid w-full max-w-[1100px] gap-8 rounded-[2.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(8,19,24,0.95),rgba(6,14,18,0.78))] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.35)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid content-between gap-8">
              <div className="grid gap-5">
                <span className="text-[0.68rem] uppercase tracking-[0.34em] text-[#d4c1a1]/70">Acesso interno</span>
                <h1 className="font-display text-5xl leading-[0.9] text-[#f6ead6] sm:text-6xl">Painel operacional da Deu Lagoa.</h1>
                <p className="max-w-lg text-base leading-8 text-stone-300/78">Área reservada para atualização de conteúdo, acompanhamento de reservas e revisão da mídia pública exibida no site.</p>
              </div>
              <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/4 p-6 text-sm text-stone-300/78">
                <span className="text-[0.68rem] uppercase tracking-[0.34em] text-stone-400">Atalho</span>
                <strong className="text-lg text-stone-100">Ctrl + Shift + V</strong>
                <p>O painel continua oculto da navegação pública. O acesso só é liberado com o código configurado internamente.</p>
              </div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onLogin(code);
              }}
              className="grid gap-6 rounded-[2.2rem] border border-white/10 bg-black/18 p-6 sm:p-8"
            >
              <div className="grid gap-3">
                <span className="text-[0.68rem] uppercase tracking-[0.34em] text-stone-400">Código de acesso</span>
                <input
                  type="password"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className="h-14 rounded-2xl border border-white/12 bg-[#09161a] px-4 text-base text-stone-100 outline-none transition focus:border-[#d4c1a1]"
                  placeholder="Digite o código interno"
                />
              </div>
              <button type="submit" className="inline-flex h-14 items-center justify-center rounded-full bg-[#d4c1a1] px-6 text-sm font-semibold text-[#102126] transition hover:bg-[#ead6af]">
                Entrar no painel
              </button>
              <div className="grid gap-3 rounded-[1.8rem] border border-white/10 bg-white/4 p-5 text-sm leading-7 text-stone-300/72">
                <strong className="text-stone-100">O que este painel controla</strong>
                <span>Texto principal, blocos editoriais, categorias de hospedagem, galeria pública e agenda de solicitações.</span>
              </div>
            </form>
          </div>
        </div>

        {notice ? <Toast message={notice} /> : null}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#051015] px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1480px]">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-[#081317]/88 px-5 py-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:px-7">
          <div>
            <span className="text-[0.68rem] uppercase tracking-[0.34em] text-[#d4c1a1]/70">Painel interno</span>
            <h1 className="mt-2 text-2xl font-semibold text-stone-100">Deu Lagoa Uruaú</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => navigateTo(`/vendedor/${tab.key}`)}
                className={`rounded-full px-4 py-2 text-sm transition ${currentTab === tab.key ? 'bg-[#d4c1a1] text-[#102126]' : 'border border-white/10 bg-white/4 text-stone-300 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
            <button type="button" onClick={onLogout} className="rounded-full border border-white/10 px-4 py-2 text-sm text-stone-300 transition hover:text-white">
              Sair
            </button>
          </div>
        </header>

        <main className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="grid gap-6">
            {currentTab === 'overview' ? <OverviewTab content={content} metrics={metrics} /> : null}
            {currentTab === 'brand' ? <BrandTab draft={draft} setDraft={setDraft} onSave={() => saveDraft('Marca atualizada.')} /> : null}
            {currentTab === 'stays' ? <StaysTab draft={draft} setDraft={setDraft} onSave={() => saveDraft('Hospedagem atualizada.')} /> : null}
            {currentTab === 'gallery' ? <GalleryTab draft={draft} setDraft={setDraft} onSave={() => saveDraft('Galeria atualizada.')} /> : null}
            {currentTab === 'reservations' ? <ReservationsTab content={content} onPersistContent={onPersistContent} /> : null}
            {currentTab === 'config' ? <ConfigTab draft={draft} setDraft={setDraft} onSave={() => saveDraft('Configuração atualizada.')} onResetDemo={onResetDemo} /> : null}
          </div>

          <aside className="grid gap-6 self-start lg:sticky lg:top-6">
            <PreviewPanel draft={draft} />
            <div className="rounded-[2rem] border border-white/10 bg-[#081317]/88 p-6">
              <span className="text-[0.68rem] uppercase tracking-[0.34em] text-stone-400">Estado do painel</span>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-stone-300/76">
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <span>Hospedagem</span>
                  <strong className="text-stone-100">{draft.suites.length}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <span>Galeria pública</span>
                  <strong className="text-stone-100">{draft.instagramPosts.length}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Solicitações</span>
                  <strong className="text-stone-100">{content.reservations.length}</strong>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {notice ? <Toast message={notice} /> : null}
    </div>
  );
}

function OverviewTab({ content, metrics }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#081317]/88 p-6 lg:p-8">
      <span className="text-[0.68rem] uppercase tracking-[0.34em] text-[#d4c1a1]/70">Visão geral</span>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Solicitações totais" value={metrics.reservationCount} />
        <MetricCard label="Períodos bloqueados" value={metrics.activeCount} />
        <MetricCard label="Pendências" value={metrics.pendingCount} />
        <MetricCard label="Ocupação 90 dias" value={`${metrics.occupancyRate}%`} />
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.8rem] border border-white/10 bg-white/4 p-5 text-sm leading-7 text-stone-300/78">
          <strong className="text-stone-100">Canal público atual</strong>
          <p className="mt-3">{content.resort.instagramHandle} · {content.resort.instagramUrl}</p>
          <p className="mt-3">{content.resort.tagline}</p>
        </div>
        <div className="rounded-[1.8rem] border border-white/10 bg-white/4 p-5 text-sm leading-7 text-stone-300/78">
          <strong className="text-stone-100">Requisitos ainda não homologados publicamente</strong>
          <ul className="mt-3 grid gap-2">
            {content.verification.pendingValidation.slice(0, 4).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BrandTab({ draft, setDraft, onSave }) {
  const resort = draft.resort;
  return (
    <EditorShell title="Marca e hero" description="Textos, mídia principal e informações visíveis no buyer.">
      <div className="grid gap-5 lg:grid-cols-2">
        <Input label="Nome" value={resort.name} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, name: value } }))} />
        <Input label="Tagline" value={resort.tagline} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, tagline: value } }))} />
      </div>
      <Input label="Título principal" value={resort.heroTitle} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, heroTitle: value } }))} />
      <Textarea label="Texto principal" value={resort.heroCopy} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, heroCopy: value } }))} rows={4} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Input label="Imagem hero" value={resort.heroImage} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, heroImage: value } }))} />
        <Input label="Vídeo hero" value={resort.featureVideo} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, featureVideo: value } }))} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Input label="Poster do vídeo" value={resort.featureVideoPoster} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, featureVideoPoster: value } }))} />
        <Input label="URL do Instagram" value={resort.instagramUrl} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, instagramUrl: value } }))} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Input label="Handle público" value={resort.instagramHandle} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, instagramHandle: value } }))} />
        <Input label="Localização" value={resort.location} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, location: value } }))} />
      </div>
      <div className="flex justify-end">
        <SaveButton onClick={onSave} />
      </div>
    </EditorShell>
  );
}

function StaysTab({ draft, setDraft, onSave }) {
  return (
    <EditorShell title="Hospedagem e narrativa" description="Categorias, descrição principal e painéis editoriais.">
      <div className="grid gap-8">
        {draft.suites.map((suite, index) => (
          <div key={suite.slug || index} className="grid gap-4 rounded-[1.8rem] border border-white/10 bg-white/3 p-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <Input label="Nome" value={suite.name} onChange={(value) => setDraft((current) => {
                const next = clone(current);
                next.suites[index].name = value;
                return next;
              })} />
              <Input label="Slug" value={suite.slug} onChange={(value) => setDraft((current) => {
                const next = clone(current);
                next.suites[index].slug = value;
                return next;
              })} />
            </div>
            <Input label="Imagem principal" value={suite.image} onChange={(value) => setDraft((current) => {
              const next = clone(current);
              next.suites[index].image = value;
              return next;
            })} />
            <Textarea label="Resumo" value={suite.summary} onChange={(value) => setDraft((current) => {
              const next = clone(current);
              next.suites[index].summary = value;
              return next;
            })} rows={3} />
            <Textarea label="Detalhes" value={suite.details} onChange={(value) => setDraft((current) => {
              const next = clone(current);
              next.suites[index].details = value;
              return next;
            })} rows={4} />
            <Textarea label="Amenidades (uma por linha)" value={(suite.amenities || []).join('\n')} onChange={(value) => setDraft((current) => {
              const next = clone(current);
              next.suites[index].amenities = value.split('\n').map((item) => item.trim()).filter(Boolean);
              return next;
            })} rows={4} />
          </div>
        ))}

        <div className="grid gap-6 rounded-[1.8rem] border border-white/10 bg-white/3 p-5">
          <strong className="text-stone-100">Painéis editoriais</strong>
          {draft.storyPanels.map((panel, index) => (
            <div key={panel.id || index} className="grid gap-4 border-t border-white/8 pt-5 first:border-t-0 first:pt-0">
              <div className="grid gap-5 lg:grid-cols-2">
                <Input label="Eyebrow" value={panel.eyebrow} onChange={(value) => setDraft((current) => {
                  const next = clone(current);
                  next.storyPanels[index].eyebrow = value;
                  return next;
                })} />
                <Input label="Imagem" value={panel.image} onChange={(value) => setDraft((current) => {
                  const next = clone(current);
                  next.storyPanels[index].image = value;
                  return next;
                })} />
              </div>
              <Input label="Título" value={panel.title} onChange={(value) => setDraft((current) => {
                const next = clone(current);
                next.storyPanels[index].title = value;
                return next;
              })} />
              <Textarea label="Texto" value={panel.copy} onChange={(value) => setDraft((current) => {
                const next = clone(current);
                next.storyPanels[index].copy = value;
                return next;
              })} rows={3} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <SaveButton onClick={onSave} />
      </div>
    </EditorShell>
  );
}

function GalleryTab({ draft, setDraft, onSave }) {
  return (
    <EditorShell title="Galeria pública" description="Imagens e links usados na vitrine principal.">
      <div className="grid gap-5">
        {draft.instagramPosts.map((post, index) => (
          <div key={post.id || index} className="grid gap-4 rounded-[1.8rem] border border-white/10 bg-white/3 p-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <Input label="ID" value={post.id} onChange={(value) => setDraft((current) => {
                const next = clone(current);
                next.instagramPosts[index].id = value;
                return next;
              })} />
              <Input label="Imagem" value={post.image} onChange={(value) => setDraft((current) => {
                const next = clone(current);
                next.instagramPosts[index].image = value;
                return next;
              })} />
            </div>
            <Input label="URL da publicação" value={post.sourceUrl || ''} onChange={(value) => setDraft((current) => {
              const next = clone(current);
              next.instagramPosts[index].sourceUrl = value;
              return next;
            })} />
            <Textarea label="Legenda" value={post.caption} onChange={(value) => setDraft((current) => {
              const next = clone(current);
              next.instagramPosts[index].caption = value;
              return next;
            })} rows={3} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setDraft((current) => ({
            ...current,
            instagramPosts: current.instagramPosts.concat({ id: `ig-${Date.now()}`, image: '', caption: '', sourceUrl: '' }),
          }))}
          className="rounded-full border border-white/12 px-5 py-3 text-sm text-stone-200 transition hover:border-white/24 hover:text-white"
        >
          Adicionar item
        </button>
        <SaveButton onClick={onSave} />
      </div>
    </EditorShell>
  );
}

function ReservationsTab({ content, onPersistContent }) {
  return (
    <EditorShell title="Solicitações de reserva" description="Atualize o status para liberar ou bloquear novamente o período.">
      <div className="grid gap-4">
        {content.reservations.length === 0 ? (
          <div className="rounded-[1.8rem] border border-dashed border-white/14 bg-white/3 p-6 text-sm text-stone-300/70">Nenhuma solicitação registrada até agora.</div>
        ) : (
          content.reservations.map((reservation) => (
            <div key={reservation.id} className="grid gap-4 rounded-[1.8rem] border border-white/10 bg-white/3 p-5 lg:grid-cols-[1.2fr_0.8fr_auto] lg:items-center">
              <div className="grid gap-2 text-sm leading-7 text-stone-300/78">
                <strong className="text-base text-stone-100">{reservation.guestName}</strong>
                <span>{reservation.guestContact}</span>
                <span>{formatDateRange(reservation.checkin, reservation.checkout)}</span>
              </div>
              <div className="grid gap-1 text-sm text-stone-300/74">
                <span>Status atual</span>
                <strong className="text-stone-100">{formatReservationStatus(reservation.status)}</strong>
              </div>
              <select
                value={reservation.status}
                onChange={(event) => onPersistContent((current) => ({
                  ...current,
                  reservations: current.reservations.map((item) => item.id === reservation.id ? { ...item, status: event.target.value } : item),
                }), 'Reserva atualizada.')}
                className="h-12 rounded-full border border-white/12 bg-[#09161a] px-4 text-sm text-stone-100 outline-none"
              >
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
                <option value="completed">Concluída</option>
              </select>
            </div>
          ))
        )}
      </div>
    </EditorShell>
  );
}

function ConfigTab({ draft, setDraft, onSave, onResetDemo }) {
  return (
    <EditorShell title="Configuração" description="Ajustes internos e restauração da base local.">
      <div className="grid gap-5 lg:grid-cols-2">
        <Input label="Código do painel" value={draft.resort.sellerCode} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, sellerCode: value } }))} />
        <Input label="Check-in" value={draft.resort.checkIn} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, checkIn: value } }))} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Input label="Check-out" value={draft.resort.checkOut} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, checkOut: value } }))} />
        <Input label="Telefone visível" value={draft.resort.reservationPhone || ''} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, reservationPhone: value } }))} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Input label="WhatsApp" value={draft.resort.reservationWhatsapp || ''} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, reservationWhatsapp: value } }))} />
        <Input label="E-mail" value={draft.resort.reservationEmail || ''} onChange={(value) => setDraft((current) => ({ ...current, resort: { ...current.resort, reservationEmail: value } }))} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button type="button" onClick={onResetDemo} className="rounded-full border border-red-400/30 px-5 py-3 text-sm text-red-200 transition hover:border-red-300/50 hover:text-red-100">
          Restaurar base local
        </button>
        <SaveButton onClick={onSave} />
      </div>
    </EditorShell>
  );
}

function PreviewPanel({ draft }) {
  return (
    <motion.section layout className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#081317]/88 shadow-[0_24px_90px_rgba(0,0,0,0.24)]">
      <div className="relative h-72 overflow-hidden">
        <img src={draft.resort.heroImage} alt={draft.resort.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,10,0.1),rgba(3,8,10,0.84))]" />
        <div className="absolute inset-x-0 bottom-0 grid gap-3 p-6">
          <span className="text-[0.64rem] uppercase tracking-[0.34em] text-[#d4c1a1]/72">Prévia pública</span>
          <h2 className="font-display text-4xl leading-[0.9] text-[#f6ead6]">{draft.resort.heroTitle}</h2>
          <p className="max-w-sm text-sm leading-7 text-stone-300/78">{draft.resort.heroCopy}</p>
        </div>
      </div>
    </motion.section>
  );
}

function EditorShell({ title, description, children }) {
  return (
    <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-[#081317]/88 p-6 lg:p-8">
      <div className="grid gap-2">
        <h2 className="text-xl font-semibold text-stone-100">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-stone-300/72">{description}</p>
      </div>
      {children}
    </section>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-white/4 p-5">
      <span className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-400">{label}</span>
      <strong className="mt-3 block text-3xl text-stone-100">{value}</strong>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="grid gap-2">
      <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-400">{label}</label>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="h-14 rounded-2xl border border-white/12 bg-[#09161a] px-4 text-base text-stone-100 outline-none transition focus:border-[#d4c1a1]" />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 4 }) {
  return (
    <div className="grid gap-2">
      <label className="text-[0.68rem] uppercase tracking-[0.32em] text-stone-400">{label}</label>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="rounded-[1.5rem] border border-white/12 bg-[#09161a] px-4 py-4 text-base text-stone-100 outline-none transition focus:border-[#d4c1a1]" />
    </div>
  );
}

function SaveButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="rounded-full bg-[#d4c1a1] px-6 py-3 text-sm font-semibold text-[#102126] transition hover:bg-[#ead6af]">
      Salvar alterações
    </button>
  );
}

function Toast({ message }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(calc(100%-1.5rem),480px)] -translate-x-1/2 rounded-full border border-white/10 bg-[#0b181c]/92 px-5 py-3 text-center text-sm text-stone-100 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      {message}
    </div>
  );
}
