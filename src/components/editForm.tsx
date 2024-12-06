import { BSON } from "mongodb";
import { useState } from "react";
import LexEditor from "./lexicalEditorComponent";

type modifyMenuType = {
  shown: boolean;
  articleId: BSON.ObjectId | null;
  category: string | null;
  image: string | null;
  path: string | null;
  author: string | null;
  title: string | null;
  history: string[] | null;
  content: string | null;
};

export default function Form({
  modifyMenuObject,
}: {
  modifyMenuObject: modifyMenuType;
}) {
  const [serializedState, setSerializedState] = useState<string | null>(null);
  const [successful, setSuccessful] = useState<boolean | undefined>(undefined);

  console.log(modifyMenuObject.content!)

  const jsonContent = JSON.parse(modifyMenuObject.content!)
  console.log(jsonContent)

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault(); 
    if (!serializedState) {
      console.error("No serialized state available");
      setSuccessful(false);
      return;
    }

    try {
      const res = await fetch("/api/modifyManuscript", {
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
      <label>
        Title
        <input
          type="text"
          name="title"
          value={formData.title}
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Category
        <input
          type="text"
          name="category"
          value={formData.category}
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Image SRC
        <input
          type="text"
          name="image"
          value={formData.image}
          required
          onChange={handleChange}
        />
      </label>
      <label>Content</label>
      <LexEditor onSerializedStateChange={setSerializedState} initialContent={modifyMenuObject.content!} />

      <button className="adminButton standard" type="submit">
        Update
      </button>
      {successful && (
        <span className="success">
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
