// eslint-disable-next-line no-unused-vars
import React from "react";
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/system';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import { blue } from '@mui/material/colors';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

// Create a custom styled icon component with blue color
const BlueFolderOpenIcon = styled(SourceOutlinedIcon)({
  color: blue[500], 
});

const GifIconComponent = styled(GifBoxOutlinedIcon)({
  color: blue[500],
}); 

const BallotIconComponent = styled(BallotOutlinedIcon)({
  color: blue[500],
});

const EmojiIconComponent = styled(EmojiEmotionsOutlinedIcon)({
    color: blue[500],
    });

const EventIconComponent = styled(EventNoteOutlinedIcon)({
    color: blue[500],
    });

const GoodIconComponent = styled(FmdGoodOutlinedIcon)({
    color: blue[500],
    });






const Tweetbox = () => {
    return (
        <div className="tweetbox-container">
            <div className="tweetbox-title">
                <h2>Home</h2>
            </div>
            <div className="tweetbox">
                <Avatar src="Public/photo.jpg" 
                    sx={{ width: 60, height: 60 }} 
                />
                <input type="text" placeholder="What's happening?!"></input>
            </div>
        
            <div className="tweetbox-line">
                <hr />
            </div>
            <div className="tweetbox-footer">
                <div className="tweetbox-footer">
                    <BlueFolderOpenIcon />
                    <GifIconComponent />
                    <BallotIconComponent />
                    <EmojiIconComponent />
                    <EventIconComponent />
                    <GoodIconComponent />
                </div>
                <div className="tweet-button">
                    <button className="t-button">Tweet</button>
                </div>
            </div>

           
            
        
        </div>
    );
} 

export default Tweetbox;