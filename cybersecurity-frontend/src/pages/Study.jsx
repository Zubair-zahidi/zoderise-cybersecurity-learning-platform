import { useState } from 'react';
import { studyTopics } from '../data/studyTopics';
import { Search, BookOpen, ChevronRight, X } from 'lucide-react';

const Study = () => {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const filtered = studyTopics.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative min-h-screen bg-primary text-text pb-16">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_left,_rgba(0,168,204,0.18),transparent_38%)]" />
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="glass-panel rounded-[24px] border border-border p-8 shadow-panel">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-muted">Study Library</p>
              <h1 className="mt-4 text-4xl font-semibold">Cybersecurity topics, polished for focused learning.</h1>
              <p className="mt-4 max-w-2xl text-muted">Search, discover, and explore curated lessons across security domains with a clean, professional interface.</p>
            </div>
            <div className="rounded-[20px] bg-secondary border border-border px-5 py-4 text-sm text-text shadow-panel">
              <p className="text-muted text-xs uppercase tracking-[0.3em]">Total topics</p>
              <p className="mt-3 text-3xl font-semibold text-accent">{studyTopics.length}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search topics..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full rounded-[16px] border border-border bg-secondary px-14 py-4 text-text placeholder:text-muted focus:border-accent focus:outline-none focus-ring"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="glass-card group rounded-[24px] border border-border p-6 text-left transition duration-200 hover:border-accent/60 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-muted">{topic.category}</p>
                  <h3 className="mt-4 text-xl font-semibold text-text">{topic.title}</h3>
                </div>
                <ChevronRight className="h-5 w-5 text-accent transition group-hover:translate-x-1" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{topic.content}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="glass-panel max-w-3xl w-full rounded-[24px] border border-border p-8 shadow-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-muted">Lesson Details</p>
                <h2 className="mt-3 text-3xl font-semibold text-text">{selectedTopic.title}</h2>
                <p className="mt-2 text-sm text-accent">{selectedTopic.category}</p>
              </div>
              <button onClick={() => setSelectedTopic(null)} className="rounded-full border border-border bg-secondary p-3 text-muted transition hover:border-accent hover:text-text focus-ring">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-8">
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-text">Overview</h3>
                <p className="text-muted leading-relaxed">{selectedTopic.content}</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-text">Detailed Description</h3>
                <div className="text-muted leading-relaxed whitespace-pre-line">{selectedTopic.description}</div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Study;