interface SkillItemViewProp {
  skill: string
}

export default function SkillItem({ skill }: SkillItemViewProp) {
  return (
    <span className="max-h-[30px] rounded-3xl border border-primary px-2 py-1 text-sm text-primary">
      {skill}
    </span>
  )
}
