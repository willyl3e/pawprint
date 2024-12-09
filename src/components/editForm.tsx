import { useState } from "react";
import LexEditor from "./lexicalEditorComponent";
import styles from "@/app/admin/admin.module.css";

type modifyMenuType = {
  shown: boolean;
  articleId: string | null | undefined;
  category: string | null | undefined;
  image: string | null | undefined;
  path: string | null | undefined;
  author: string | null | undefined;
  title: string | null | undefined;
  history: string[] | null | undefined;
  content: string | null | undefined;
};

export default function Form({
  modifyMenuObject,
}: {
  modifyMenuObject: modifyMenuType;
}) {
  const [serializedState, setSerializedState] = useState<string | null>(null);
  const [successful, setSuccessful] = useState<boolean | undefined>(undefined);

  console.log(modifyMenuObject.content!);

  const jsonContent = JSON.parse(modifyMenuObject.content!);
  console.log(jsonContent);

  const [formData, setFormData] = useState({
    title: modifyMenuObject.title || "",
    category: modifyMenuObject.category || "",
    image: modifyMenuObject.image || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    if (!serializedState) {
      console.error("No serialized state available");
      setSuccessful(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/modifyManuscript`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionType: "update",
          id: modifyMenuObject.articleId,
          title: formData.title,
          content: serializedState,
          category: formData.category,
          img: formData.image,
        }),
      });

      if (res.ok) {
        setSuccessful(true);
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setSuccessful(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.label}>
        Title
        <input
          type="text"
          name="title"
          value={formData.title}
          required
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Category
        <input
          type="text"
          name="category"
          value={formData.category}
          required
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Image SRC
        <input
          type="text"
          name="image"
          value={formData.image}
          required
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>Content</label>
      <LexEditor
        onSerializedStateChange={setSerializedState}
        initialContent={modifyMenuObject.content!}
      />

      <button
        className={`${styles.adminButton} ${styles.standard}`}
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="14px"
          viewBox="0 -960 960 960"
          width="14px"
          fill="#1155cc"
          className={`${styles.iconOffset}`}
        >
          <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
        </svg>
        Update
      </button>
      {successful && (
        <span className={styles.successful}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#78A75A"
          >
            <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
          </svg>
          Successfully changed
        </span>
      )}
      {successful === false && (
        <span className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#78A75A"
          >
            <path d="M382-221.91 135.91-468l75.66-75.65L382-373.22l366.43-366.43L824.09-664 382-221.91Z" />
          </svg>
          Error
        </span>
      )}
    </form>
  );
}
