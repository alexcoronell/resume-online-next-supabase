"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/form/Input";
import { InputSelect } from "@/components/ui/form/InputSelect";
import { InputFile } from "@/components/ui/form/InputFile";
import { InputCheck } from "@/components/ui/form/InputCheck";
import { TextArea } from "@/components/ui/form/TextArea";
import { ButtonSubmit } from "@/components/ui/form/ButtonSubmit";
import { ButtonSecondary } from "@/components/shared/buttons/button-secondary";
import { ButtonLight } from "../../shared/buttons/button-light";

import { CreateWorkDto, UpdateWorkDto } from "@/core/dtos/Work,dto";

import type { RequestStatus } from "@/core/types/RequestStatus.type";
import { StatusForm } from "@/core/types/StatusForm.type";

import { addWork, updateWork, getWorkById } from "@/core/services/work.service";

import styles from "@/styles/formContainer.module.css";

interface PortfolioFormProps {
  _id?: string | null;
}

export function PortfolioForm({ _id = null }: PortfolioFormProps) {
  const router = useRouter();
  const [work, setWork] = useState<CreateWorkDto | UpdateWorkDto>({
    title: "",
    url: "",
    repoUrl: "",
    originRepo: "Github",
    publicRepo: true,
    image: "",
    order: 0,
    status: "Inactive",
    technologies: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    url: "",
    repoUrl: "",
    originRepo: "",
    publicRepo: "",
    image: "",
    order: "",
    status: "",
    technologies: "",
  });

  const originRepositoryOptions = [
    { value: "None", label: "None" },
    { value: "Github", label: "Github" },
    { value: "Gitlab", label: "Gitlab" },
    { value: "Bitbucket", label: "Bitbucket" },
    { value: "Other", label: "Other" },
  ];

  const statusWorkOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Archived", label: "Archived" },
    { value: "In development", label: "In development" },
    { value: "Developing", label: "Developing" },
    { value: "Completed", label: "Completed" },
  ];

  const [id, setId] = useState<string | null>(null);
  const [titlePage, setTitlePage] = useState("Create Work");
  const [titleButton, setTitleButton] = useState("Add");
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");
  const [statusForm, setStatusForm] = useState<StatusForm>("create");

  useEffect(() => {
    if (_id) {
      setId(_id);
      setStatusForm("details");
      setTitlePage("Details Portfolio");
      getWork(_id);
    }
  }, []);

  const getWork = async (id: string) => {
    setRequestStatus("loading");
    try {
      const { data } = await getWorkById(id);
      if (!data) throw new Error("Error fetching work");
      setWork({
        title: data.title,
        url: data.url,
        repoUrl: data.repoUrl,
        originRepo: data.originRepo,
        publicRepo: data.publicRepo,
        image: data.image,
        order: data.order,
        status: data.status,
        technologies: data.technologies,
      });
      setRequestStatus("success");
    } catch (error) {
      console.error(error);
      alert("Error fetching work");
      setRequestStatus("failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      const checked = e.target.checked;
      setWork((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }
    setWork((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name} is required`,
      }));
    }
  };

  const handleCancelEdit = () => {
    setStatusForm("details");
    setTitlePage("Details Study");
    getWork(id as string);
    setErrors({
      title: "",
      url: "",
      repoUrl: "",
      originRepo: "",
      publicRepo: "",
      image: "",
      order: "",
      status: "",
      technologies: "",
    });
    setRequestStatus("init");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return;
  };

  return (
    <div className={styles.FormContainer}>
      <h2 className="titleForm">{titlePage}</h2>
      <div className={styles.FormContainer__box}>
        <form
          className="grid col-span-2 px-2 gap-x-3 mx-auto max-w-[600px]"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              placeholder="Title"
              name="title"
              classes="col-span-2"
              id="title"
              type="text"
              value={work.title}
              errorMessage={errors.title}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.title}
              readonly={statusForm === "details"}
            />

            <Input
              placeholder="Url"
              name="url"
              classes="col-span-2"
              id="url"
              type="url"
              value={work.url}
              errorMessage={errors.url}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.url}
              readonly={statusForm === "details"}
            />

            <Input
              placeholder="Repository Url"
              name="repoUrl"
              classes="col-span-2"
              id="repoUrl"
              type="url"
              value={work.repoUrl}
              errorMessage={errors.repoUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.repoUrl}
              readonly={statusForm === "details"}
            />
            <InputSelect
              name="originRepo"
              placeholder="Origin Repository"
              value={work.originRepo}
              options={originRepositoryOptions}
              onChange={handleChange}
              disabled={statusForm === "details" || requestStatus === "loading"}
              />
          </div>
        </form>
      </div>
    </div>
  );
}
