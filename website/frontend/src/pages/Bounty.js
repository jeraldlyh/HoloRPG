import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import Activity from "../components/home/Activity";
import CardLight from "../components/CardLight";
import { attackPlayer, getBountyList } from "../store/actions/Bounty";
import { GiSwordWound } from "react-icons/gi";

function Bounty(props) {
  const { user, current_health } = props.profile;
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    props.getBountyList().then((response) => {
      setBounties(response.data);
    });
  }, []);

  const attackPlayer = (index) => {
    const body = {
      bounty: bounties[index],
      attacker: user,
    };
    props
      .attackPlayer(bounties[index].id, body)
      .then((response) => setBounties(response.data.bounty))
      .catch((error) => console.log(error));
  };

  const hasInsufficientHP = () => {
    return current_health === 0;
  };

  return (
    <Layout>
      {/* <div className="self-start grid grid-cols-6 my-5 mx-10 border-2 border-custom-green">
                <span className="pt-3 px-6 text-center uppercase font-bold col-span-2">Target</span>
                <span className="pt-3 px-6 text-center uppercase font-bold col-span-3">Paid by</span>
                <span className="py-3 px-6 text-center uppercase font-bold row-span-2 self-end">Action</span>
                <span className="py-3 px-6 text-center uppercase font-bold">User</span>
                <span className="py-3 px-6 text-center uppercase font-bold">HP</span>
                <span className="py-3 px-6 text-center uppercase font-bold">User</span>
                <span className="py-3 px-6 text-center uppercase font-bold">Bounty</span>
                <span className="py-3 px-6 text-center uppercase font-bold">Placed at</span>
                {
                    bounties.length !== 0
                    ? bounties.map((bounty, index) => {
                        return (
                            <div key={index} className="grid grid-cols-6 col-span-6 items-center hover:bg-gray-900">
                                <span className="py-3 px-3 text-center">{bounty.target}</span>
                                <span className="py-3 px-3 text-center">{bounty.target_health.current_health}/{bounty.target_health.max_health}</span>
                                <span className="py-3 px-3 text-center">{bounty.placed_by}</span>
                                <span className="py-3 px-3 text-center">{bounty.value}</span>
                                <span className="py-3 px-3 text-center">{bounty.placed_at.substr(bounty.placed_at.indexOf(" "))}</span>
                                <div className="py-3 px-3 text-center">
                                    <button className="border-2 border-custom-blue rounded-lg p-1 focus:outline-none disabled:bg-red-500" type="button" disabled={hasInsufficientHP()} onClick={() => attackPlayer(index)}>Attack</button>
                                </div>
                            </div>
                        )
                    })
                    : <div className="col-span-6 h-64 flex justify-center items-center text-sm">There's currently no bounties placed</div>
                }
            </div> */}

      <div className="flex w-full h-full justify-between">
        <CardLight>
          <div className="flex justify-around mb-3">
            <span className="w-28 text-center font-semibold">NAME</span>
            <span className="w-20 text-center font-semibold">HP</span>
            <span className="w-32 text-center font-semibold">PLACED BY</span>
            <span className="w-36 text-center font-semibold">BOUNTY VALUE</span>
            <span className="w-20 text-center font-semibold">TIME</span>
            <span className="w-20 text-center font-semibold"></span>
          </div>
          <hr className="border-custom-color-grey w-full mt-1 mb-2"></hr>
          <div className="flex justify-around items-center text-sm my-2">
            <p className="w-28 text-center">Player_123</p>
            <p className="w-20 text-center">52/80</p>
            <p className="w-32 text-center">Player_456</p>
            <p className="w-36 text-center font-semibold">$300.20</p>
            <p className="w-20 text-center text-gray-300 text-xs">1m ago</p>
            <button className="flex w-20 h-10 bg-custom-button-primary text-white font-bold py-2 px-4 rounded-lg justify-center items-center">
                <GiSwordWound size={16}/>
            </button>
            <div></div>
          </div>
            
          
        </CardLight>
        <Activity />
      </div>
      
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profileReducer.profile,
});

const mapDispatchToProps = {
  attackPlayer,
  getBountyList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bounty);
