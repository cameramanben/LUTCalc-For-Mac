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

@property (assign) IBOutlet NSWindow *window;
@property (nonatomic, retain) IBOutlet WebView *webView;

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)selector;
+ (BOOL)isKeyExcludedFromWebScript:(const char *)property;
+ (NSString *) webScriptNameForSelector:(SEL)sel;

- (NSString *) appOS;
- (void) printCharts;
- (BOOL) saveLUTToFile:(NSString*) lutContent
          withFileName:(NSString*) fileName
     withFileExtension:(NSString*) fileExtension
       usingFullDialog:(NSInteger) doDialog
      withSourceObject:(NSInteger) source;
- (BOOL) saveBINToFile:(NSArray*) lutContent
          withFileName:(NSString*) fileName
     withFileExtension:(NSString*) fileExtension
       usingFullDialog:(NSInteger) doDialog
      withSourceObject:(NSInteger) source;
- (void) loadLUTWithExtensions:(NSString*) fileExtensions
                 toDestination:(NSString*)destination
                    fromObject:(NSInteger) parenIdx
                       goingTo:(NSInteger) next;
- (void) loadImgWithExtensions:(NSString*) fileExtensions
                 toDestination:(NSString*)destination
                    fromObject:(NSInteger) parenIdx
                       goingTo:(NSInteger) next;
- (NSArray *) fileToByteArray: (NSData *) fileData;
- (NSData *) byteArrayToFile: (NSArray *) arrayData;
- (void) logOSXWithText:(NSString*) logMessage;

@end

