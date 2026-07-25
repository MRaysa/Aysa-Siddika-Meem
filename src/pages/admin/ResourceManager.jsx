import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from "react-icons/fi";
import FieldInput from "./FieldInput";
import { getPath, setPath } from "./pathUtils";

// Generic CRUD manager for one resource, driven by a config from fields.js.
const ResourceManager = ({ config }) => {
  const { api, fields, titleKey, subtitleKey, label } = config;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // form draft object, or null
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await api.list());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const startCreate = () => setEditing({});
  const startEdit = (item) => setEditing(structuredClone(item));
  const cancel = () => setEditing(null);

  const updateField = (key, value) => {
    setEditing((prev) => setPath(prev, key, value));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      if (editing._id) {
        await api.update(editing._id, editing);
      } else {
        await api.create(editing);
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item[titleKey]}"? This cannot be undone.`))
      return;
    try {
      await api.remove(item._id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {label}{" "}
          <span className="text-gray-400 text-base font-normal">
            ({items.length})
          </span>
        </h2>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
        >
          <FiPlus /> Add New
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No {label.toLowerCase()} yet. Add one!</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition"
            >
              <div className="min-w-0">
                <p className="text-gray-900 font-medium truncate">
                  {item[titleKey] || "(untitled)"}
                </p>
                {subtitleKey && (
                  <p className="text-gray-500 text-sm truncate">
                    {item[subtitleKey]}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 transition"
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => remove(item)}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-300 transition"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 overflow-y-auto"
            onClick={cancel}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl my-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {editing._id ? "Edit" : "New"} {label.replace(/s$/, "")}
                </h3>
                <button
                  onClick={cancel}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-700"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {fields.map((field) => (
                  <FieldInput
                    key={field.key}
                    field={field}
                    value={getPath(editing, field.key)}
                    onChange={(v) => updateField(field.key, v)}
                  />
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={cancel}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
                >
                  <FiSave />
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourceManager;
