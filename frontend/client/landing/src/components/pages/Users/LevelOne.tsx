import LevelOneTable from "@/components/organisms/LevelOneTable";
import LevelOneNewStakeModal from "@/components/organisms/LevelOneNewStakeModal";

const LevelOne = () => {
  // const [loaded] = useState<boolean>(!!0)
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Level One</h1>
        <LevelOneNewStakeModal size="icon"/>
      </div>
      <div>
        <LevelOneTable/>
      </div>
    </div>
  )
}

export default LevelOne