import { useState } from "react";
import { FiUploadCloud, FiLoader } from "react-icons/fi";
import { uploadImage, isCloudinaryConfigured } from "../../lib/cloudinary";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition text-sm";

// Renders a single form control based on the field definition + current value.
const FieldInput = ({ field, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const commonLabel = (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {field.label}
      {field.required && <span className="text-red-500"> *</span>}
    </label>
  );

  const help = field.help && (
    <p className="text-xs text-gray-500 mt-1">{field.help}</p>
  );

  switch (field.type) {
    case "textarea":
      return (
        <div>
          {commonLabel}
          <textarea
            rows={3}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
          {help}
        </div>
      );

    case "number":
      return (
        <div>
          {commonLabel}
          <input
            type="number"
            value={value ?? ""}
            onChange={(e) =>
              onChange(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder={field.placeholder}
            className={inputClass}
          />
          {help}
        </div>
      );

    case "boolean":
      return (
        <label className="flex items-center gap-3 cursor-pointer py-2">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="w-5 h-5 rounded accent-indigo-600"
          />
          <span className="text-sm font-medium text-gray-700">
            {field.label}
          </span>
        </label>
      );

    case "select":
      return (
        <div>
          {commonLabel}
          <select
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          >
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {help}
        </div>
      );

    case "tags": {
      // Stored as an array; edited as comma- or newline-separated text.
      const asText = Array.isArray(value) ? value.join("\n") : value ?? "";
      const parse = (text) =>
        text
          .split(/[\n,]/)
          .map((s) => s.trim())
          .filter(Boolean);
      return (
        <div>
          {commonLabel}
          <textarea
            rows={field.multiline ? 4 : 2}
            value={asText}
            onChange={(e) => onChange(parse(e.target.value))}
            placeholder={field.placeholder || "One per line, or comma-separated"}
            className={inputClass}
          />
          {help}
        </div>
      );
    }

    case "image":
      return (
        <div>
          {commonLabel}
          <div className="flex items-start gap-4">
            {value ? (
              <img
                src={value}
                alt="preview"
                className="w-24 h-24 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                No image
              </div>
            )}
            <div className="flex-1 space-y-2">
              {isCloudinaryConfigured() ? (
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm cursor-pointer hover:bg-indigo-100 transition">
                  {uploading ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    <FiUploadCloud />
                  )}
                  {uploading ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadError("");
                      setUploading(true);
                      try {
                        const url = await uploadImage(file);
                        onChange(url);
                      } catch (err) {
                        setUploadError(err.message);
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                </label>
              ) : (
                <p className="text-xs text-amber-600">
                  Cloudinary not configured — paste an image URL below.
                </p>
              )}
              <input
                type="text"
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="or paste an image URL"
                className={inputClass}
              />
              {uploadError && (
                <p className="text-xs text-red-500">{uploadError}</p>
              )}
            </div>
          </div>
          {help}
        </div>
      );

    default:
      return (
        <div>
          {commonLabel}
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
          {help}
        </div>
      );
  }
};

export default FieldInput;
