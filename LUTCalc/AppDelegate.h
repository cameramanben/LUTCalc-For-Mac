//
//  AppDelegate.h
//  LUTCalc
//
//  Created by Ben Turley on 04/10/2014.
//  Copyright (c) 2014 Ben Turley. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface AppDelegate : NSObject <NSApplicationDelegate>

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)selector;
+ (BOOL)isKeyExcludedFromWebScript:(const char *)property;
+ (NSString *) webScriptNameForSelector:(SEL)sel;

- (NSString *) appOS;
- (BOOL) saveLUTToFile:(NSString*) lutContent withFileName:(NSString*) fileName withFileExtension:(NSString*) fileExtension;
- (BOOL) saveBINToFile:(NSData*) lutContent withFileName:(NSString*) fileName withFileExtension:(NSString*) fileExtension;
- (void) loadLUTWithExtensions:(NSString*) fileExtensions
                       toDestination:(NSString*)destination
                          fromObject:(NSInteger) parenIdx
                             goingTo:(NSInteger) next;

@end

