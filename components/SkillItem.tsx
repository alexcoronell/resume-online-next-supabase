interface SkillItemViewProp {
    skill: string
}

export default function SkillItem({skill}: SkillItemViewProp) {
    return (
        <span className="px-2 py-1 border border-primary rounded-3xl text-primary text-sm max-h-[30px]">{skill}</span>
    )
}