useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole(session.user);
      setUserRole(role);
    };
    const fetchUserDorm = async () => {
      const dorm_query = await getUserDorm(session.user);
      console.log(dorm_query);
      if (dorm_query) setUserDorm(dorm_query.dorm_name);
    };
    const fetchUserRoomNum = async () => {
      const room_query = await getUserRoomNumber(session.user);
      console.log(room_query);
      if (room_query) setRoomNum(room_query.room_number);
    };
    fetchUserDorm();
    fetchUserRole();
    fetchUserRoomNum();
  }, []);

  async function onRegisterRoleClick(role) {
    console.log(role);
    let message = await registerUserRole(user, role);
    setUserRole(role);
    console.log(message);
    nav("/services");
  }

  const onCreateDormClick = async () => {
    const dorm_name = document.getElementById("dorm_name").value;
    const dorm_email = document.getElementById("dorm_email").value;
    const dorm_location = document.getElementById("dorm_location").value;
    const dorm_rooms = document.getElementById("dorm_room_num").value;
    const error = await createDorm(
      dorm_name,
      dorm_email,
      dorm_location,
      dorm_rooms,
      user
    );
    if (!error) {
      nav("/profile");
    } else {
      document.getElementById("error").textContent = error.message;
    }
  };

  const onJoinDormClick = async () => {
    const dorm_name = document.getElementById("dorm_name").value;
    const error = await joinDorm(user, dorm_name);
    if (!error) {
      nav("/profile");
    } else {
      console.error(error);
    }
  };

  const onAssignRoomClick = async (residentId, roomNumber) => {
    await assignRoom(residentId, roomNumber);
    // You may want to refresh the user's data here
  };

  const onAcceptSignInClick = async (residentId) => {
    await acceptSignIn(residentId);
    // You may want to refresh the user's data here
  };

  const onLogoutResidentClick = async (residentId) => {
    await logoutResident(residentId);
    // You may want to refresh the user's data here
  };

  return (
    <>
      {/* Other parts of the component remain the same */}
      {userRole === "dormowner" && (
        <div className="owner-actions">
          <h className="owner-action-title">Dorm Owner Actions:</h>
          <BtnMedium
            withBackground={true}
            withBorder={true}
            onClick={() => onAssignRoomClick(residentId, roomNumber)}
          >
            Assign Room
          </BtnMedium>
          <BtnMedium
            withBackground={true}
            withBorder={true}
            onClick={() => onAcceptSignInClick(residentId)}
          >
            Accept Sign In
          </BtnMedium>
          <BtnMedium
            withBackground={true}
            withBorder={true}
            onClick={() => onLogoutResidentClick(residentId)}
          >
            Logout Resident
          </BtnMedium>
        </div>
      )}
    </>
  );
;

export default Services;
