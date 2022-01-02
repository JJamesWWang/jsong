import { useAppSelector } from "../app/hooks";

function MemberList() {
  const members = useAppSelector((state) => state.lobby.members);

  const memberList = members.map((member) => (
    <li key={member.uid}>{member.username}</li>
  ));

  return (
    <>
      <p>Players:</p>
      <ul>{memberList}</ul>
    </>
  );
}

export default MemberList;
