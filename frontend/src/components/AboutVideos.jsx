import '../scss/AboutVideos.scss';

export function AboutVideos() {
    return (
        <div className='AboutVideos'>
            <div className="links">
                <a href='#intro'>Introduction</a>
                <a href='#registration'>Sign Up</a>
                <a href='#cash_input_out'>Cash Input/Cash Out</a>
                <a href='#add_card'>Add Card</a>
                <a href='#transfer'>Transfer</a>
                <a href='#transfer_to_friends'>Transfer to Friends</a>
                <a href='#change_profile'>Change Profile</a>
                <a href='#dark_mode'>Dark Mode</a>
                <a href='#support'>Support</a>
                <a href='#delete_accoutn'>Delete Account</a>
            </div>

            <div className="videos">
                <video src="videos/video_0.mp4" id='intro' controls />
                <video src="videos/video_1.mp4" id='registration' controls />
                <video src="videos/video_2.mp4" id='cash_input_out' controls />
                <video src="videos/video_3.mp4" id='add_card' controls />
                <video src="videos/video_4.mp4" id='transfer' controls />
                <video src="videos/video_5.mp4" id='transfer_to_friends' controls />
                <video src="videos/video_6.mp4" id='change_profile' controls />
                <video src="videos/video_7.mp4" id='dark_mode' controls />
                <video src="videos/video_8.mp4" id='support' controls />
                <video src="videos/video_9.mp4" id='delete_accoutn' controls />
            </div>
        </div>
    )
}
