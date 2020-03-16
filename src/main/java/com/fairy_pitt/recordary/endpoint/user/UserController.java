package com.fairy_pitt.recordary.endpoint.user;

import com.fairy_pitt.recordary.endpoint.user.dto.*;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RequestMapping("user")
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping("/join")
    public Boolean join(@RequestBody UserSaveRequestDto requestDto){
        return userService.save(requestDto);
    }

    @PostMapping("/login")
    public UserResponseDto login(@RequestBody UserLoginRequestDto requestDto){
        return userService.login(requestDto);
    }

    @GetMapping("/logout")
    public Boolean logout(){
        return userService.logout();
    }

    @PutMapping("/{userId}")
    public String update(@PathVariable String userId, @RequestBody UserUpdateRequestDto requestDto){
        return userService.update(userId, requestDto);
    }

    @DeleteMapping("/{userId}")
    public String delete(@PathVariable String userId){
        userService.delete(userId);
        return userId;
    }

    @GetMapping("/{userId}")
    public UserResponseDto findById(@PathVariable String userId){
        return userService.findById(userId);
    }

    @GetMapping("/search/{inputNm}")
    public List<UserListResponseDto> findNmUser(@PathVariable String inputNm){
        return userService.findNmUser(inputNm);
    }

    @GetMapping("/possibleId/{userId}")
    public Boolean possibleId(@PathVariable String userId){
        return userService.possibleId(userId);
    }

    @GetMapping("/current")
    public String currentUser(){
        return userService.currentUser();
    }
}
