import { useAppSelector } from "../app/hooks";
import styles from "./MemberList.module.css";

function MemberList() {
  const members = useAppSelector((state) => state.lobby.members);

  const memberList = members.map((member) => (
    <li key={member.uid} className={styles.li}>
      {member.username}
    </li>
  ));

  return (
    <div className={styles.memberList}>
      <p>Players:</p>
      <ul className={styles.ul}>{memberList}</ul>
    </div>
  );
}

export default MemberList;
