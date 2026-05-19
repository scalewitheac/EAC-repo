import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NotebookFrame } from "../components/notebook/NotebookShell";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const useAuthApi = () => {
  const { token } = useAuth();
  return axios.create({
    baseURL: API,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const Section = ({ title, children }) => (
  <section className="sticky tilt-l mb-6 p-5" data-testid={`admin-section-${title.toLowerCase().replace(/\s+/g, "-")}`}>
    <span className="tape" />
    <h3 className="font-marker text-2xl text-[var(--ink-color)] mb-3">{title}</h3>
    {children}
  </section>
);

const UploadField = ({ label, onUploaded, accept, testId }) => {
  const api = useAuthApi();
  const [busy, setBusy] = useState(false);

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post(`/upload`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      onUploaded(data.storage_path);
      toast(`uploaded ${file.name}`);
    } catch (err) {
      toast("upload failed.");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <label className="pico-btn cursor-pointer inline-block" data-testid={testId}>
      {busy ? "uploading..." : label}
      <input type="file" className="hidden" accept={accept} onChange={onPick} />
    </label>
  );
};

const AdminPanel = () => {
  const { admin, token } = useAuth();
  const api = useAuthApi();
  const [messages, setMessages] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [writings, setWritings] = useState([]);
  const [videos, setVideos] = useState([]);

  const [d, setD] = useState({ title: "", date: "", image_path: "", tags: "", description: "" });
  const [w, setW] = useState({ title: "", date: "", content: "", tags: "" });
  const [v, setV] = useState({ title: "", date: "", external_url: "", video_path: "", thumbnail_path: "", tags: "", description: "" });

  const loadAll = async () => {
    const [mr, dr, wr, vr] = await Promise.all([
      api.get(`/messages?all=true`),
      api.get(`/drawings`),
      api.get(`/writings`),
      api.get(`/videos`),
    ]);
    setMessages(mr.data); setDrawings(dr.data); setWritings(wr.data); setVideos(vr.data);
  };

  useEffect(() => { if (token) loadAll(); /* eslint-disable-next-line */ }, [token]);

  if (!token) return <Navigate to="/admin/login" replace />;

  const approve = async (id) => { await api.patch(`/messages/${id}/approve`); toast("approved"); loadAll(); };
  const delMsg = async (id) => { await api.delete(`/messages/${id}`); toast("deleted"); loadAll(); };

  const addDrawing = async (e) => {
    e.preventDefault();
    if (!d.title || !d.date || !d.image_path) { toast("title, date, image required"); return; }
    await api.post(`/drawings`, { ...d, tags: d.tags.split(",").map(s => s.trim()).filter(Boolean) });
    setD({ title: "", date: "", image_path: "", tags: "", description: "" });
    toast("added");
    loadAll();
  };
  const addWriting = async (e) => {
    e.preventDefault();
    if (!w.title || !w.date || !w.content) { toast("title, date, content required"); return; }
    await api.post(`/writings`, { ...w, tags: w.tags.split(",").map(s => s.trim()).filter(Boolean) });
    setW({ title: "", date: "", content: "", tags: "" });
    toast("added");
    loadAll();
  };
  const addVideo = async (e) => {
    e.preventDefault();
    if (!v.title || !v.date || (!v.external_url && !v.video_path)) { toast("title, date, and either url or upload required"); return; }
    await api.post(`/videos`, { ...v, tags: v.tags.split(",").map(s => s.trim()).filter(Boolean) });
    setV({ title: "", date: "", external_url: "", video_path: "", thumbnail_path: "", tags: "", description: "" });
    toast("added");
    loadAll();
  };

  const remove = async (col, id) => {
    await api.delete(`/${col}/${id}`);
    toast("removed");
    loadAll();
  };

  const page = (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-marker text-5xl text-[var(--ink-color)] tilt-l2">admin panel</h2>
        <span className="font-pixel uppercase text-xs tracking-widest text-[var(--ink-soft)]">
          {admin?.email}
        </span>
      </div>

      <Section title="Messages">
        <div className="space-y-3 max-h-[40vh] overflow-y-auto notebook-scroll pr-2">
          {messages.length === 0 && <p className="font-hand text-[var(--ink-soft)]">no messages.</p>}
          {messages.map((m) => (
            <div key={m.id} className="border-2 border-[var(--ink-color)] p-3 bg-[var(--bg-color)]" data-testid={`admin-msg-${m.id}`}>
              <div className="flex items-baseline justify-between">
                <div className="font-marker text-lg">{m.name} <span className="font-pixel text-xs text-[var(--ink-soft)] uppercase tracking-widest">{m.email}</span></div>
                <span className={`font-pixel uppercase text-xs tracking-widest ${m.approved ? "text-[var(--ink-color)]" : "text-[var(--margin-color)]"}`}>
                  {m.approved ? "approved" : "pending"}
                </span>
              </div>
              <p className="font-hand whitespace-pre-wrap mt-1">{m.message}</p>
              <div className="font-hand text-xs text-[var(--ink-soft)] mt-1">
                {m.website && <>site: {m.website} · </>}{m.found_via && <>found via: {m.found_via} · </>}{m.sender_descriptor && <>map: {m.sender_descriptor}</>}
              </div>
              <div className="mt-2 flex gap-2">
                {!m.approved && <button className="pico-btn" onClick={() => approve(m.id)} data-testid={`approve-msg-${m.id}`}>approve</button>}
                <button className="pico-btn" onClick={() => delMsg(m.id)} data-testid={`delete-msg-${m.id}`}>delete</button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Add Drawing">
        <form onSubmit={addDrawing} className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-testid="add-drawing-form">
          <input className="pico-input font-hand" placeholder="title" value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} data-testid="drawing-title-input" />
          <input className="pico-input font-hand" placeholder="MM/DD/YYYY" value={d.date} onChange={(e) => setD({ ...d, date: e.target.value })} data-testid="drawing-date-input" />
          <input className="pico-input font-hand sm:col-span-2" placeholder="image storage_path or URL" value={d.image_path} onChange={(e) => setD({ ...d, image_path: e.target.value })} data-testid="drawing-image-input" />
          <input className="pico-input font-hand sm:col-span-2" placeholder="tags (comma separated)" value={d.tags} onChange={(e) => setD({ ...d, tags: e.target.value })} data-testid="drawing-tags-input" />
          <textarea className="pico-input font-hand sm:col-span-2 min-h-[60px]" placeholder="description" value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} data-testid="drawing-desc-input" />
          <div className="sm:col-span-2 flex gap-2">
            <UploadField label="upload image" accept="image/*" testId="drawing-upload-btn" onUploaded={(p) => setD((cur) => ({ ...cur, image_path: p }))} />
            <button type="submit" className="pico-btn" data-testid="drawing-submit-btn">add drawing</button>
          </div>
        </form>
        <div className="mt-3 max-h-32 overflow-y-auto notebook-scroll text-sm">
          {drawings.map((it) => (
            <div key={it.id} className="flex items-center justify-between border-b border-[var(--ink-soft)] py-1">
              <span className="font-hand">{it.date} · "{it.title}"</span>
              <button className="pico-btn" onClick={() => remove("drawings", it.id)} data-testid={`del-drawing-${it.id}`}>×</button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Add Writing">
        <form onSubmit={addWriting} className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-testid="add-writing-form">
          <input className="pico-input font-hand" placeholder="title" value={w.title} onChange={(e) => setW({ ...w, title: e.target.value })} data-testid="writing-title-input" />
          <input className="pico-input font-hand" placeholder="MM/DD/YYYY" value={w.date} onChange={(e) => setW({ ...w, date: e.target.value })} data-testid="writing-date-input" />
          <input className="pico-input font-hand sm:col-span-2" placeholder="tags (comma separated)" value={w.tags} onChange={(e) => setW({ ...w, tags: e.target.value })} data-testid="writing-tags-input" />
          <textarea className="pico-input font-hand sm:col-span-2 min-h-[140px]" placeholder="content" value={w.content} onChange={(e) => setW({ ...w, content: e.target.value })} data-testid="writing-content-input" />
          <div className="sm:col-span-2"><button type="submit" className="pico-btn" data-testid="writing-submit-btn">add writing</button></div>
        </form>
        <div className="mt-3 max-h-32 overflow-y-auto notebook-scroll text-sm">
          {writings.map((it) => (
            <div key={it.id} className="flex items-center justify-between border-b border-[var(--ink-soft)] py-1">
              <span className="font-hand">{it.date} · "{it.title}"</span>
              <button className="pico-btn" onClick={() => remove("writings", it.id)} data-testid={`del-writing-${it.id}`}>×</button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Add Video">
        <form onSubmit={addVideo} className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-testid="add-video-form">
          <input className="pico-input font-hand" placeholder="title" value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} data-testid="video-title-input" />
          <input className="pico-input font-hand" placeholder="MM/DD/YYYY" value={v.date} onChange={(e) => setV({ ...v, date: e.target.value })} data-testid="video-date-input" />
          <input className="pico-input font-hand sm:col-span-2" placeholder="external url (youtube/vimeo embed) — leave empty if uploading" value={v.external_url} onChange={(e) => setV({ ...v, external_url: e.target.value })} data-testid="video-url-input" />
          <input className="pico-input font-hand sm:col-span-2" placeholder="video storage_path (filled by upload)" value={v.video_path} onChange={(e) => setV({ ...v, video_path: e.target.value })} data-testid="video-path-input" />
          <input className="pico-input font-hand sm:col-span-2" placeholder="thumbnail storage_path or URL" value={v.thumbnail_path} onChange={(e) => setV({ ...v, thumbnail_path: e.target.value })} data-testid="video-thumb-input" />
          <input className="pico-input font-hand sm:col-span-2" placeholder="tags (comma separated)" value={v.tags} onChange={(e) => setV({ ...v, tags: e.target.value })} data-testid="video-tags-input" />
          <textarea className="pico-input font-hand sm:col-span-2 min-h-[60px]" placeholder="description" value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} data-testid="video-desc-input" />
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <UploadField label="upload video" accept="video/*" testId="video-upload-btn" onUploaded={(p) => setV((cur) => ({ ...cur, video_path: p }))} />
            <UploadField label="upload thumbnail" accept="image/*" testId="video-thumb-upload-btn" onUploaded={(p) => setV((cur) => ({ ...cur, thumbnail_path: p }))} />
            <button type="submit" className="pico-btn" data-testid="video-submit-btn">add video</button>
          </div>
        </form>
        <div className="mt-3 max-h-32 overflow-y-auto notebook-scroll text-sm">
          {videos.map((it) => (
            <div key={it.id} className="flex items-center justify-between border-b border-[var(--ink-soft)] py-1">
              <span className="font-hand">{it.date} · "{it.title}"</span>
              <button className="pico-btn" onClick={() => remove("videos", it.id)} data-testid={`del-video-${it.id}`}>×</button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  return <NotebookFrame single>{page}</NotebookFrame>;
};

export default AdminPanel;
